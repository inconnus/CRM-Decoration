export const STATUS_MAPPING = {
    AVAILABLE: 'ใช้งานได้',
    CANCELLED: 'ถูกยกเลิก',
    USED: 'ใช้งานแล้ว',
    EXPIRED: 'หมดอายุ'
}
export const UNIT_MAPPING = {
    baht: 'บาท',
    percent: 'เปอร์เซ็น',
}
export const PREVIEW_DATA = [
    {
        "expiryTimestamp": 1709571599000,
        "unit": "percent",
        "status": "AVAILABLE",
        "timestamp": 1709543180258,
        "amount": 100,
        "id": "01HR4BDHZ26Y72FBX953KFAMVW#mdVzE3#00",
        "name": "TEST2",
        "value": 20,
        "company": "DrPONG"
    },
    {
        "expiryTimestamp": 1709571599000,
        "unit": "percent",
        "status": "CANCELLED",
        "timestamp": 1709543270047,
        "amount": 100,
        "id": "01HR4BG9MZGDGPGAENHWN4NA20#n7ttOy#00",
        "name": "TEST2",
        "value": 20,
        "company": "DrPONG"
    },
    {
        "expiryTimestamp": 1709571599000,
        "unit": "baht",
        "status": "EXPIRED",
        "timestamp": 1709543560944,
        "amount": 100,
        "id": "01HR4BS5QGD74A81KACVFC45D9#bYU2FG#00",
        "name": "TEST2",
        "value": 20,
        "company": "DrPONG"
    }
]