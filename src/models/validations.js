import * as Yup from "yup";
import {CAMPUSES} from "@/commons/Constants";

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .min(6, "Your email is too short")
        .max(50, "Your email is too long")
        .email("Your email is invalid")
        .required("Required"),
    password: Yup.string()
        .min(6, "Your password is too short")
        .max(24, "Your password is too long")
        .required("Required"),
});

export const SignupSchema = Yup.object().shape({
    first: Yup.string()
        .min(2, "Your name is too short")
        .max(50, "Your name is too long")
        .required("Required"),
    last: Yup.string()
        .min(2, "Your email is too short")
        .max(50, "Your name is too long")
        .required("Required"),
    email: Yup.string()
        .min(6, "Your email is too short")
        .max(50, "Your email is too long")
        .email("Your email is invalid")
        .required("Required"),
    password: Yup.string()
        .min(6, "Your password is too short")
        .max(24, "Your password is too long")
        .required("Required"),
    confPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Your confirm password should match your password")
        .required("Required"),
    school: Yup.string()
        .oneOf(['Northeastern University'], 'Please choose school from the list'),
    campus: Yup.string()
        .oneOf(CAMPUSES, 'Please choose campus from the list'),
    company: Yup.string()
        .min(2, "Your company is too short")
        .max(50, "Your company is too long")
});

export const resetPassSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, "Your password is too short")
        .max(24, "Your password is too long")
        .required("Required"),
    confPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Your confirm password should match your password")
        .required("Required"),
})

export const UpdateSchema = Yup.object().shape({
    first: Yup.string()
        .min(2, "Your name is too short")
        .max(50, "Your name is too long")
        .required("Required"),
    last: Yup.string()
        .min(2, "Your email is too short")
        .max(50, "Your name is too long")
        .required("Required"),
    email: Yup.string()
        .min(6, "Your email is too short")
        .max(50, "Your email is too long")
        .email("Your email is invalid")
        .required("Required"),
    school: Yup.string()
        .oneOf(['Northeastern University'], 'Please choose school from the list'),
    campus: Yup.string()
        .oneOf(CAMPUSES, 'Please choose campus from the list'),
    company: Yup.string()
        .min(2, "Your company is too short")
        .max(50, "Your company is too long")
});