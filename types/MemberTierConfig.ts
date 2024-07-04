// To parse this data:
//
//   import { Convert, MemberTierConfig } from "./file";
//
//   const memberTierConfig = Convert.toMemberTierConfig(json);

export interface MemberTierConfig {
    company?: string;
    module?:  string;
    status?:  string;
    tiers?:   Tier[];
}

export interface Tier {
    birthday?:    Birthday;
    birthmonth?:  Birthmonth;
    description?: string;
    name?:        string;
    rank?:        number;
    redemption?:  Redemption;
    amount?:      number;
}

export interface Birthday {
    discount?:   BirthdayDiscount;
    redemption?: number;
}

export interface BirthdayDiscount {
    atleast?: number;
    unit?:    string;
    value?:   number;
}

export interface Birthmonth {
    discount?:   BirthmonthDiscount;
    redemption?: number;
}

export interface BirthmonthDiscount {
    min?:   number;
    unit?:  string;
    value?: number;
}

export interface Redemption {
    multiplier?: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toMemberTierConfig(json: string): MemberTierConfig {
        return JSON.parse(json);
    }

    public static memberTierConfigToJson(value: MemberTierConfig): string {
        return JSON.stringify(value);
    }
}
