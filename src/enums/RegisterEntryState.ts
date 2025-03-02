export interface RegisterEntryStateValues {
    accepted: boolean;
    reviewed: boolean;
}

export enum RegisterEntryState {
    UNREVIEWED = "unreviewed",
    ACCEPTED = "accepted",
    DENIED = "denied"
}

export const getRegisterEntryStateValues = (state: RegisterEntryState): RegisterEntryStateValues => {
    switch (state) {
        case RegisterEntryState.UNREVIEWED:
            return { accepted: false, reviewed: false };
        case RegisterEntryState.ACCEPTED:
            return { accepted: true, reviewed: true };
        case RegisterEntryState.DENIED:
            return { accepted: false, reviewed: true };
    }
};