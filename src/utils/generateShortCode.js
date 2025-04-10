function generateReadableShortCode({
    county,
    subCounty,
    ward,
    buildingName,
    floor,
    unit,
    streetDirection,
    isFlat,
    plotNumber,
}) {
    const countyCode = (county || 'X')[0].toUpperCase(); // e.g. Nairobi -> N
    const subCountyCode = (subCounty || 'X')[0].toUpperCase(); // e.g. Langata -> L
    const wardCode = (ward || 'X')[0].toUpperCase(); // e.g. Langata -> L
    const directionCode = streetDirection ? streetDirection.toUpperCase() : 'X'; // e.g. East -> E

    // For flat addresses (apartments)
    let raw;
    if (isFlat) {
        raw = `${wardCode}-${buildingName}-${plotNumber || 'XX'}${floor}-${unit}-${Date.now()}`;
    } else {
        // For non-flat addresses (houses)
        raw = `${wardCode}-${buildingName}-${plotNumber || 'XX'}-${Date.now()}`;
    }

    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
        hash = (hash << 5) - hash + raw.charCodeAt(i);
        hash |= 0; // Convert to 32-bit int
    }

    const hashCode = Math.abs(hash).toString(36).toUpperCase().slice(0, 5); // First 5 characters of base36 hash

    // Combine into human-readable format
    return `${countyCode}${subCountyCode} ${hashCode}${plotNumber || ''} ${directionCode}`;
}

module.exports = generateReadableShortCode;
