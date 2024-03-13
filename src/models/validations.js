import * as Yup from "yup";
import {CAMPUSES} from "@/commons/Constants";

export const SignupSchema = Yup.object().shape({
    first: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    last: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    email: Yup.string()
        .min(6, "Too Short!")
        .max(50, "Too Long!")
        .email("Invalid email")
        .required("Required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Too Long!")
        .required("Required"),
    confPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    school: Yup.string()
        .oneOf(['Northeastern University']),
    campus: Yup.string()
        .oneOf(CAMPUSES),
    company: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!"),
});