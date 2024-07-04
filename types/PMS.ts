export interface PMS {
    company?:      string;
    module?:       string;
    installments?: Installment[];
    qr?:           Full;
    config?:       Config;
    full?:         Full;
}

export interface Config {
    accounts?: Account[];
}

export interface Account {
    accountNumber?: string;
    alias?:         string;
    bankCode?:      string;
    bankName?:      string;
}

export interface Full {
    isActive?: boolean;
    provider?: string;
}

export interface Installment {
    bankCode?: string;
    isActive?: boolean;
    provider?: string;
    plans?:    number[];
}
