import axios from "axios";

export const sendOtp = async (phoneNumber: string, otp: string): Promise<{ error: boolean; message: string; otp?: string }> => {
    try {
        const response = await axios.post(
            "https://www.fast2sms.com/dev/bulkV2",
            {
                variables_values: otp,
                route: "otp",
                numbers: phoneNumber,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    authorization: process.env.SMS_API_KEY!,
                },
            }
        );

        if (response.data.return) {
            return { error: false, message: "OTP sent successfully", otp: otp };
        } else {
            throw new Error("Failed to send OTP");
        }
    } catch (error) {
        console.error(error);
        return { error: true, message: "Failed to send OTP" };
    }
};
