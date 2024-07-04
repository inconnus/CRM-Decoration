export interface Member {
    moduleInfo: ModuleInfo;
    userInfo: UserInfo;
}

export interface ModuleInfo {
    PK: string;
    SK: string;
    gUId: string;
    timestamp: number;
    line: string;
    activated: boolean;
    amount: number;
    point: number;
    qrCode: string;
    questions: Questions;
    cardNumber: number;
    policy: Policy;
    referralId: string;
    updatedTimestamp: number;
    expTimestamp?: number;
    tier: string;
}

export interface Policy {
    isAcceptPolicy: boolean;
    timestamp: number;
}

export interface Questions {
    สาขาที่สมัคร: string;
    อาชีพ: string;
}

export interface UserInfo {
    gUId: string;
    activated: boolean;
    amount: number;
    point: number;
    phoneNumber: string;
    lastName: string;
    addresses: Address[];
    firstName: string;
    gender: string;
    imgUrl: string;
    displayName: string;
    zipcode: string;
    birthdate: number;
    category: number;
    birthday: Birthday;
}

export interface Address {
    zipcode: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    province: string;
    subdistrict: string;
    district: string;
}

export interface Birthday {
    month: number;
    day: number;
    year: number;
}
