import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import router from "next/router";
import { login } from "api/authApi";
import { setItem } from "utils/local";
import { getOneUser } from "api/userApi";
import { AuthContext } from "context/authProvider";

export const Login = () => {
    //get setAuth method from context API
    const { setAuth } = useContext(AuthContext);

    const [authError, setAuthError] = useState({
        username: null,
        password: null,
    });
    const schema = yup
        .object({
            username: yup.string().required("Vui Lòng Điền Tên Đăng Nhập"),
            password: yup.string().required("Vui Lòng Điền Mật Khẩu"),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // Handle submit login form
    const onSubmitHandler = async ({ username, password }) => {
        try {
            const response = await login({ username, password });
            if (response.role === "Customer") {
                setItem("TOKEN", JSON.stringify(response.token));
                const userDetails = await getOneUser(response.id);
                if (userDetails.active) {
                    setAuth(userDetails);
                    return router.push("/");
                }
            } else {
                setAuthError((prevState) => ({
                    ...prevState,
                    username: "Tên Đăng Nhập Không Tồn Tại",
                }));
            }
        } catch (err) {
            if (err.response?.status === 400) {
                setAuthError((prevState) => ({
                    ...prevState,
                    username: "Tên Đăng Nhập Không Tồn Tại",
                }));
            } else if (err.response?.status === 401) {
                setAuthError((prevState) => ({
                    ...prevState,
                    password: "Mật Khẩu Không Đúng",
                }));
            }
        }
    };

    return (
        <>
            {/* <!-- BEGIN LOGIN --> */}
            <div className="login">
                <div className="wrapper">
                    <div
                        className="login-form js-img"
                        // style={{ backgroundImage: `url('/assets/img/login-form__bg.png')` }}
                    >
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            {/* <h3>log in with</h3>
                            <SocialLogin /> */}

                            <div className="box-field">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tên Đăng Nhập"
                                    {...register("username")}
                                    onFocus={() =>
                                        setAuthError((prevState) => ({
                                            ...prevState,
                                            username: "",
                                        }))
                                    }
                                />
                                {errors.username && (
                                    <p style={{ color: "red" }}>
                                        {`*${errors.username.message}`}
                                    </p>
                                )}
                                {authError?.username && (
                                    <p style={{ color: "red" }}>
                                        {`*${authError.username}`}
                                    </p>
                                )}
                            </div>
                            <div className="box-field">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Mật Khẩu"
                                    {...register("password")}
                                    onFocus={() =>
                                        setAuthError((prevState) => ({
                                            ...prevState,
                                            password: "",
                                        }))
                                    }
                                />
                                {errors.password && (
                                    <p style={{ color: "red" }}>{`*${
                                        errors.password.message || error
                                    }`}</p>
                                )}
                                {authError?.password && (
                                    <p style={{ color: "red" }}>
                                        {`*${authError.password}`}
                                    </p>
                                )}
                            </div>
                            {/* <label className="checkbox-box checkbox-box__sm">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                Remember me
                            </label> */}
                            <button className="btn">Đăng Nhập</button>
                            <div className="login-form__bottom">
                                <span>
                                    Bạn Chưa Có Tài Khoản?{" "}
                                    <a
                                        onClick={() =>
                                            router.push("/registration")
                                        }
                                    >
                                        Đăng Ký
                                    </a>
                                </span>
                                <a href="#">Quên Mật Khẩu?</a>
                            </div>
                        </form>
                    </div>
                </div>
                {/* <img
                    className="promo-video__decor js-img"
                    src="/assets/img/promo-video__decor.jpg"
                    alt=""
                /> */}
            </div>
            {/* <!-- LOGIN EOF   --> */}
        </>
    );
};
