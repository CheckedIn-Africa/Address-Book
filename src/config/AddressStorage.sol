// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AddressStorage {

    // Struct to represent an address record with expanded fields
    struct Address {
        string country;         // Country where the address is located, defaulting to 'Kenya'
        string county;          // County in which the address is located, defaulting to 'Nairobi'
        string subCounty;       // Sub-county within the county
        string ward;            // Ward within the sub-county
        string street;          // Street name of the address
        string streetDirection; // Direction of the street (East, West, North, South)
        string buildingName;    // Name of the building
        bool isFlat;            // Boolean to indicate if the building is a flat (apartment)
        string buildingType;    // Type of building (Residential, Commercial, Mixed)
        uint256 buildingNumber; // Number of the building
        uint256 plotNumber;     // Plot number (as per county records)
        uint256 floor;          // Floor number where the unit is located
        string unit;            // Unit number (e.g., "SU123")
        string entrance;        // Entrance description (optional)
        uint256 distance;       // Distance from the main road (e.g., "200 meters")
        string shortCode;       // Unique short code for the address
        int256[] location;      // Geospatial location information (longitude, latitude)
    }

    address public owner;
    mapping(address => bool) public admins; // Mapping to track admins
    mapping(string => Address) private addresses;
    string[] private shortCodes;

    event AddressStored(string shortCode, string country, string county, string subCounty);
    event AddressUpdated(string shortCode, string country, string county, string subCounty);
    event AddressDeleted(string shortCode);
    event AdminAdded(address admin);
    event AdminRemoved(address admin);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == owner || admins[msg.sender], "Only admins can perform this action");
        _;
    }

    // Constructor to set the owner of the contract
    constructor() {
        owner = msg.sender; // Set the contract owner to the account deploying the contract
        admins[msg.sender] = true; // By default, the contract deployer is an admin
    }

    // Function to add an admin
    function addAdmin(address admin) public onlyOwner {
        require(admin != address(0), "Invalid address");
        admins[admin] = true;
        emit AdminAdded(admin);
    }

    // Function to remove an admin
    function removeAdmin(address admin) public onlyOwner {
        require(admin != address(0), "Invalid address");
        admins[admin] = false;
        emit AdminRemoved(admin);
    }

    // Function to store an address (restricted to admins)
    function storeAddress(
        string memory shortCode,
        string memory country,
        string memory county,
        string memory subCounty,
        string memory ward,
        string memory street,
        string memory streetDirection,
        string memory buildingName,
        bool isFlat,
        string memory buildingType,
        uint256 buildingNumber,
        uint256 plotNumber,
        uint256 floor,
        string memory unit,
        string memory entrance,
        uint256 distance,
        int256[] memory location
    ) public onlyAdmin {
        require(bytes(shortCode).length > 0, "ShortCode cannot be empty");
        require(bytes(county).length > 0, "County cannot be empty");
        require(bytes(subCounty).length > 0, "Sub-county cannot be empty");
        require(bytes(street).length > 0, "Street name cannot be empty");
        require(distance > 0, "Distance from the road must be greater than zero");
        require(location.length == 2, "Location must contain exactly two coordinates (longitude, latitude)");

        // Default values if not provided
        if (bytes(country).length == 0) {
            country = "Kenya";  // Default country
        }
        if (bytes(county).length == 0) {
            county = "Nairobi"; // Default county
        }

        // Prevent overwriting an existing address
        require(bytes(addresses[shortCode].shortCode).length == 0, "Address with this shortCode already exists");

        // Create the new address struct
        Address memory newAddress = Address({
            country: country,
            county: county,
            subCounty: subCounty,
            ward: ward,
            street: street,
            streetDirection: streetDirection,
            buildingName: buildingName,
            isFlat: isFlat,
            buildingType: buildingType,
            buildingNumber: buildingNumber,
            plotNumber: plotNumber,
            floor: floor,
            unit: unit,
            entrance: entrance,
            distance: distance,
            shortCode: shortCode,
            location: location
        });

        // Store the address in the mapping
        addresses[shortCode] = newAddress;

        // Add the shortCode to the list of all shortCodes
        shortCodes.push(shortCode);

        // Emit the AddressStored event to notify that an address has been stored
        emit AddressStored(shortCode, country, county, subCounty);
    }

    // Function to update an address (restricted to admins)
    function updateAddress(
        string memory shortCode,
        string memory country,
        string memory county,
        string memory subCounty,
        string memory ward,
        string memory street,
        string memory streetDirection,
        string memory buildingName,
        bool isFlat,
        string memory buildingType,
        uint256 buildingNumber,
        uint256 plotNumber,
        uint256 floor,
        string memory unit,
        string memory entrance,
        uint256 distance,
        int256[] memory location
    ) public onlyAdmin {
        require(bytes(shortCode).length > 0, "ShortCode cannot be empty");
        require(bytes(county).length > 0, "County cannot be empty");
        require(bytes(subCounty).length > 0, "Sub-county cannot be empty");
        require(bytes(street).length > 0, "Street name cannot be empty");
        require(distance > 0, "Distance from the road must be greater than zero");
        require(location.length == 2, "Location must contain exactly two coordinates (longitude, latitude)");

        // Update the existing address
        Address memory updatedAddress = Address({
            country: country,
            county: county,
            subCounty: subCounty,
            ward: ward,
            street: street,
            streetDirection: streetDirection,
            buildingName: buildingName,
            isFlat: isFlat,
            buildingType: buildingType,
            buildingNumber: buildingNumber,
            plotNumber: plotNumber,
            floor: floor,
            unit: unit,
            entrance: entrance,
            distance: distance,
            shortCode: shortCode,
            location: location
        });

        addresses[shortCode] = updatedAddress;

        emit AddressUpdated(shortCode, country, county, subCounty);
    }

    // Function to delete an address (restricted to admins)
    function deleteAddress(string memory shortCode) public onlyAdmin {
        require(bytes(addresses[shortCode].shortCode).length != 0, "Address does not exist");

        delete addresses[shortCode];
        emit AddressDeleted(shortCode);
    }

    // Function to get an address by shortCode (restricted to admins)
    function getAddress(string memory shortCode) public view onlyAdmin returns (Address memory) {
        return addresses[shortCode];
    }

    // Function to get a list of all stored addresses (restricted to admins)
    function getAllAddresses() public view onlyAdmin returns (Address[] memory) {
        Address[] memory allAddresses = new Address[](shortCodes.length);

        for (uint256 i = 0; i < shortCodes.length; i++) {
            allAddresses[i] = addresses[shortCodes[i]];
        }

        return allAddresses;
    }

    // Function to get a list of all shortCodes (can be used to track address count)
    function getAllShortCodes() public view onlyAdmin returns (string[] memory) {
        return shortCodes;
    }
}
