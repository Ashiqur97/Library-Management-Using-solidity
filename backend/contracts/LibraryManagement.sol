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
        uint256 id; 
        address userAddress;
        string name;
        uint256[] borrowedBooks; 
        mapping(uint256 => uint256) dueDates; 
        uint256 fineAmount; 
    }

    
    struct UserDetails {
        uint256 id;
        address userAddress;
        string name;
        uint256[] borrowedBooks;
        uint256 fineAmount;
    }

  
    uint256 public nextBookId = 1; 
    uint256 public nextUserId = 1; 
    mapping(uint256 => Book) public books; 
    mapping(address => User) public users; 

    address[] public registeredUsers; 

    mapping (uint256 => User) public requestRegister;

    uint256 public requestId;


    address public admin; 
    address public librarian; 

    uint256 public constant BORROW_PERIOD = 14 days; 
    uint256 public constant FINE_PER_DAY = 0.01 ether; 

    
    event BookAdded(uint256 bookId, string title, string author, string category);
    event BookBorrowed(uint256 bookId, address borrower, uint256 dueDate);
    event BookReturned(uint256 bookId, address borrower, uint256 finePaid);
    event BookReserved(uint256 bookId, address reservedBy);
    event FineCharged(address user, uint256 fineAmount);
    event NewUserRequested (uint256 reqId, address user);
    event UserApproved (uint256 reqId, string name, address user);

    
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
        librarian = _newLibrarian;
    }

    
    function addBook(string memory _title, string memory _author, string memory _category) external onlyLibrarian {
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


        
        User storage newUser = users[msg.sender];
        newUser.id = nextUserId++;

        requestId++;

        User storage newUser = requestRegister[requestId];

        newUser.userAddress = msg.sender;
        newUser.name = _name;

        emit NewUserRequested(requestId, msg.sender);
    }

     function approveUser(uint256 _reqId) external onlyAdmin {
        require(users[requestRegister[_reqId].userAddress].userAddress == address(0), "User already registered");

        User storage newUser = users[requestRegister[_reqId].userAddress];
        newUser.userAddress = requestRegister[_reqId].userAddress;
        newUser.name = requestRegister[_reqId].name;
        newUser.borrowedBooks = new uint256[](0);
        newUser.fineAmount = 0;


     
        registeredUsers.push(msg.sender);

       
       delete requestRegister[_reqId];
       emit UserApproved(_reqId, newUser.name, newUser.userAddress);

    }

    
    function borrowBook(uint256 _bookId) external onlyRegisteredUser {
        Book storage book = books[_bookId];
        User storage user = users[msg.sender];

        require(book.id != 0, "Book does not exist");
        require(book.isAvailable, "Book is not available");
        require(book.reservedBy == address(0) || book.reservedBy == msg.sender, "Book is reserved by another user");

    
        uint256 dueDate = block.timestamp + BORROW_PERIOD;
        book.isAvailable = false;
        book.reservedBy = address(0); // Clear reservation if any
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
            uint256 daysLate = (block.timestamp - user.dueDates[_bookId]) / 1 days;
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
                payable(msg.sender).transfer(msg.value - fine); // Refund excess payment
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

        book.reservedBy = msg.sender;
        emit BookReserved(_bookId, msg.sender);
    }

    
    function payFine() external payable onlyRegisteredUser {
        User storage user = users[msg.sender];
        require(user.fineAmount > 0, "No outstanding fines");

        require(msg.value >= user.fineAmount, "Insufficient payment for fine");
        if (msg.value > user.fineAmount) {
            payable(msg.sender).transfer(msg.value - user.fineAmount); // Refund excess payment
        }

        uint256 finePaid = user.fineAmount;
        user.fineAmount = 0;
        emit FineCharged(msg.sender, finePaid);
    }

    
    function getAllBooks() external view returns (Book[] memory) {
        Book[] memory result = new Book[](nextBookId - 1);
        uint256 count = 0;

        for (uint256 i = 1; i < nextBookId; i++) {
            if (books[i].id != 0) { // Ensure the book exists
                result[count] = books[i];
                count++;
            }
        }

        
        Book[] memory validBooks = new Book[](count);
        for (uint256 i = 0; i < count; i++) {
            validBooks[i] = result[i];
        }

        return validBooks;
    }

   
    function getAllUsers() external view returns (UserDetails[] memory) {
        UserDetails[] memory result = new UserDetails[](registeredUsers.length);
        uint256 count = 0;

        for (uint256 i = 0; i < registeredUsers.length; i++) {
            address userAddress = registeredUsers[i];
            User storage user = users[userAddress];

            if (user.id != 0) { // Ensure the user exists
                result[count] = UserDetails({
                    id: user.id,
                    userAddress: user.userAddress,
                    name: user.name,
                    borrowedBooks: user.borrowedBooks,
                    fineAmount: user.fineAmount
                });
                count++;
            }
        }

       
        UserDetails[] memory validUsers = new UserDetails[](count);
        for (uint256 i = 0; i < count; i++) {
            validUsers[i] = result[i];
        }

        return validUsers;
    }

    
    function getBooks(uint256 _start, uint256 _limit) external view returns (Book[] memory) {
        require(_start < nextBookId, "Invalid start index");
        uint256 end = _start + _limit;
        if (end > nextBookId - 1) {
            end = nextBookId - 1;
        }

        Book[] memory result = new Book[](end - _start);
        for (uint256 i = _start; i < end; i++) {
            result[i - _start] = books[i + 1];
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
