// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LibraryManagement {
    
    struct Book {
        uint256 id;
        string title;
        string author;
        string category; 
        bool isAvailable; 
        address reservedBy; 
    }

    struct User {
        address userAddress;
        string name;
        uint256[] borrowedBooks; 
        mapping(uint256 => uint256) dueDates; 
        uint256 fineAmount; 
    }

  
    uint256 public nextBookId = 1; 
    mapping(uint256 => Book) public books; 
    mapping(address => User) public users; 

    address public admin; 
    address public librarian; 

    uint256 public constant BORROW_PERIOD = 14 days; 
    uint256 public constant FINE_PER_DAY = 0.01 ether; 

    
    event BookAdded(uint256 bookId, string title, string author, string category);
    event BookBorrowed(uint256 bookId, address borrower, uint256 dueDate);
    event BookReturned(uint256 bookId, address borrower, uint256 finePaid);
    event BookReserved(uint256 bookId, address reservedBy);
    event FineCharged(address user, uint256 fineAmount);

    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can perform this action");
        _;
    }

    modifier onlyLibrarian() {
        require(msg.sender == librarian || msg.sender == admin, "Only the librarian or admin can perform this action");
        _;
    }

    modifier onlyRegisteredUser() {
        require(users[msg.sender].userAddress != address(0), "User is not registered");
        _;
    }

    
    constructor() {
        admin = msg.sender;
        librarian = msg.sender;
    }

   
    function setLibrarian(address _newLibrarian) external onlyAdmin {
        require(_newLibrarian != address(0), "Invalid librarian address");
        librarian = _newLibrarian;
    }

    
    function addBook(string memory _title, string memory _author, string memory _category) external onlyLibrarian {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_author).length > 0, "Author cannot be empty");
        require(bytes(_category).length > 0, "Category cannot be empty");
        
        uint256 bookId = nextBookId++;
        books[bookId] = Book({
            id: bookId,
            title: _title,
            author: _author,
            category: _category,
            isAvailable: true,
            reservedBy: address(0)
        });
        emit BookAdded(bookId, _title, _author, _category);
    }

   
    function registerUser(string memory _name) external {
        require(users[msg.sender].userAddress == address(0), "User already registered");
        require(bytes(_name).length > 0, "Name cannot be empty");

        User storage newUser = users[msg.sender];
        newUser.userAddress = msg.sender;
        newUser.name = _name;
        newUser.borrowedBooks = new uint256[](0);
        newUser.fineAmount = 0;
       
    }

  
    function borrowBook(uint256 _bookId) external onlyRegisteredUser {
        Book storage book = books[_bookId];
        User storage user = users[msg.sender];

        require(book.id != 0, "Book does not exist");
        require(book.isAvailable, "Book is not available");
        require(book.reservedBy == address(0) || book.reservedBy == msg.sender, "Book is reserved by another user");
        require(user.fineAmount == 0, "Please clear outstanding fines first");

        
        uint256 dueDate = block.timestamp + BORROW_PERIOD;
        book.isAvailable = false;
        book.reservedBy = address(0); 
        user.borrowedBooks.push(_bookId);
        user.dueDates[_bookId] = dueDate;

        emit BookBorrowed(_bookId, msg.sender, dueDate);
    }

    
    function returnBook(uint256 _bookId) external payable onlyRegisteredUser {
        Book storage book = books[_bookId];
        User storage user = users[msg.sender];

        require(book.id != 0, "Book does not exist");
        require(!book.isAvailable, "Book is already available");
        require(user.dueDates[_bookId] > 0, "User has not borrowed this book");

        
        uint256 fine = 0;
        if (block.timestamp > user.dueDates[_bookId]) {
            uint256 daysLate = (block.timestamp - user.dueDates[_bookId] + 1 days - 1) / 1 days; 
            fine = daysLate * FINE_PER_DAY;
            user.fineAmount += fine;
        }

        
        for (uint256 i = 0; i < user.borrowedBooks.length; i++) {
            if (user.borrowedBooks[i] == _bookId) {
                user.borrowedBooks[i] = user.borrowedBooks[user.borrowedBooks.length - 1];
                user.borrowedBooks.pop();
                break;
            }
        }

        delete user.dueDates[_bookId];
        book.isAvailable = true;

       
        if (fine > 0) {
            require(msg.value >= fine, "Insufficient payment for fine");
            if (msg.value > fine) {
                payable(msg.sender).transfer(msg.value - fine); 
            }
            emit FineCharged(msg.sender, fine);
        }

        emit BookReturned(_bookId, msg.sender, fine);
    }

    
    function reserveBook(uint256 _bookId) external onlyRegisteredUser {
        Book storage book = books[_bookId];

        require(book.id != 0, "Book does not exist");
        require(!book.isAvailable, "Book is already available");
        require(book.reservedBy == address(0), "Book is already reserved");
        require(users[msg.sender].fineAmount == 0, "Please clear outstanding fines first");

        book.reservedBy = msg.sender;
        emit BookReserved(_bookId, msg.sender);
    }

    
    function payFine() external payable onlyRegisteredUser {
        User storage user = users[msg.sender];
        require(user.fineAmount > 0, "No outstanding fines");
        require(msg.value >= user.fineAmount, "Insufficient payment for fine");

        uint256 finePaid = user.fineAmount;
        user.fineAmount = 0;

        if (msg.value > finePaid) {
            payable(msg.sender).transfer(msg.value - finePaid); 
        }

        emit FineCharged(msg.sender, finePaid);
    }

    
    function getBooks(uint256 _start, uint256 _limit) external view returns (Book[] memory) {
        require(_start < nextBookId, "Invalid start index");
        
        uint256 end = _start + _limit;
        if (end >= nextBookId) {
            end = nextBookId - 1;
        }
        
        uint256 resultLength = end - _start + 1;
        Book[] memory result = new Book[](resultLength);
        
        for (uint256 i = 0; i < resultLength; i++) {
            result[i] = books[_start + i];
        }
        return result;
    }

    
    function getBorrowedBooks() external view onlyRegisteredUser returns (uint256[] memory, uint256[] memory) {
        User storage user = users[msg.sender];
        uint256[] memory dueDates = new uint256[](user.borrowedBooks.length);

        for (uint256 i = 0; i < user.borrowedBooks.length; i++) {
            dueDates[i] = user.dueDates[user.borrowedBooks[i]];
        }

        return (user.borrowedBooks, dueDates);
    }
}
