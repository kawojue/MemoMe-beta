interface Store {
    otp: string
    // pswd: string
    // user: string
    // toggles: any
    // dialog: false
    // email: string
    // token: string
    // userId: string
    // validPswd: false
    // validUser: false
    // validEmail: false
    // showPswd: boolean
    // eligible: boolean
    // currentPswd: string
    // confirmPswd: string
    setOtp: (otp: string) => void
    // setPswd: (pswd: string) => void
    // setUser: (User: string) => void
    // setEmail: (email: string) => void
    // setToken: (token: string) => void
    // setToggles: (toggles: any) => void
    // setUserId: (userId: string) => void
    // setDialog: (dialog: boolean) => void
    // setShowPswd: (showPswd: boolean) => void
    // setEligible: (eligible: boolean) => void
    // setValidPswd: (validPswd: string) => void
    // setValidUser: (validUser: string) => void
    // setCurrentPswd: (currentPswd: string) => void
    // setConfirmPswd: (confirmPswd: string) => void
}