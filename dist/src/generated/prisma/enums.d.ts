export declare const BookingStatus: {
    readonly PENDING: "PENDING";
    readonly COMFIRMED: "COMFIRMED";
    readonly CANCELLED: "CANCELLED";
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export declare const ListingType: {
    readonly APARTMENT: "APARTMENT";
    readonly HOUSE: "HOUSE";
    readonly VILLA: "VILLA";
    readonly CABIN: "CABIN";
};
export type ListingType = (typeof ListingType)[keyof typeof ListingType];
export declare const Role: {
    readonly HOST: "HOST";
    readonly GUEST: "GUEST";
};
export type Role = (typeof Role)[keyof typeof Role];
//# sourceMappingURL=enums.d.ts.map