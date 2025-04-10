// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AddressStorage {

    // Struct to represent an address record
    struct Address {
        string county;
        string subCounty;
        string buildingName;
        uint256 plotNumber;
        string streetDirection;
        bool isFlat;
        string shortCode;
    }

    // Mapping to store address data by shortCode
    mapping(string => Address) private addresses;

    // Event to notify when a new address is stored
    event AddressStored(string shortCode, string county, string subCounty);

    // Function to store an address
    function storeAddress(
        string memory shortCode,
        string memory county,
        string memory subCounty,
        string memory buildingName,
        uint256 plotNumber,
        string memory streetDirection,
        bool isFlat
    ) public {
        Address memory newAddress = Address({
            county: county,
            subCounty: subCounty,
            buildingName: buildingName,
            plotNumber: plotNumber,
            streetDirection: streetDirection,
            isFlat: isFlat,
            shortCode: shortCode
        });

        addresses[shortCode] = newAddress;
        emit AddressStored(shortCode, county, subCounty);
    }

    // Function to get an address by shortCode
    function getAddress(string memory shortCode) public view returns (Address memory) {
        return addresses[shortCode];
    }
}
