// export const FIELD_TYPES =  [
//     {
//         firstName:'First Name',
//         lastName:'Last Name'

//     }
// ];

// export const FIELD_VALUES = [
//     {
//         firstName:'text',
//         lastName:'text'
//     }
// ];

export const clients = [
    {
        firstName: "John",
        lastName: "Doe",
        mobile: "+1 555-1234",
        addressline1: "123 Main St",
        addressline2: "Apt 4B",
        country: "USA",
        state: "California",
        postalCode: "90001",
        clientCode: "0001",
        Email: "john.doe@example.com",
        status: "InActive"
    },
    {
        firstName: "Mohamed",
        lastName: "Zaheer",
        mobile: "+1 555-1234",
        addressline1: "117/1 Penthanigoda",
        addressline2: "Narammala",
        country: "Sri Lanka",
        state: "Kurunegala",
        postalCode: "60100",
        clientCode: "0002",
        Email: "mhdzaheer2003@gmail.com",
        status: "Active"
    }
];

export const suppliers = [
    {
        supplierName: "Global Hardware Supplies",
        contactName: "Emma Johnson",
        mobile: "+1 555-9876",
        email: "emma.johnson@ghs.com",
        addressline1: "456 Industry Rd",
        addressline2: "",
        country: "USA",
        state: "Texas",
        postalCode: "75001",
        supplierCode: "SUP001",
        status: "Active"
    }
];

export const employees = [
    {
        firstName: "Alice",
        lastName: "Smith",
        employeeId: "EMP001",
        position: "Sales Manager",
        email: "alice.smith@company.com",
        mobile: "+1 555-3456",
        department: "Sales",
        status: "Active"
    }
];

export const products = [
    {
        productId: "PRD001",
        name: "Hammer",
        description: "16oz claw hammer",
        category: "Tools",
        unitPrice: 12.99,
        quantityInStock: 100,
        supplierCode: "SUP001"
    }
];

export const purchases = [
    {
        purchaseId: "PUR001",
        supplierCode: "SUP001",
        productId: "PRD001",
        quantity: 50,
        unitPrice: 10.00,
        totalAmount: 500.00,
        purchaseDate: "2025-06-01"
    }
];

export const invoices = [
    {
        invoiceId: "INV001",
        clientCode: "CLT001",
        productId: "PRD001",
        quantity: 2,
        unitPrice: 12.99,
        totalAmount: 25.98,
        invoiceDate: "2025-06-02",
        status: "Paid"
    }
];
