import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const CheckoutStep1 = ({ onNext }) => {
    // Pattern tp validate phone number
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const schema = yup
        .object({
            orderPhone: yup
                .string()
                .matches(phoneRegExp, "*Số Điện Thoại Không Hợp Lệ")
                .required("*Vui Lòng Nhập Số Điện Thoại"),
            orderAddress: yup
                .string()
                .required("*Vui Lòng Nhập Địa Chỉ Nhận Hàng"),
            note: yup.string(),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <>
            {/* <!-- BEING CHECKOUT STEP ONE -->  */}
            <div className="checkout-form">
                <form onSubmit={handleSubmit(onNext)}>
                    <div className="checkout-form__item">
                        <h4>Thông Tin Của Bạn</h4>
                        <div className="box-field">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Số Điện Thoại"
                                {...register("orderPhone")}
                            />
                            {errors.orderPhone && (
                                <p style={{ color: "red" }}>
                                    {errors.orderPhone.message}
                                </p>
                            )}
                        </div>
                        <div className="box-field">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Địa Chỉ Nhận Hàng"
                                {...register("orderAddress")}
                            />
                            {errors.orderAddress && (
                                <p style={{ color: "red" }}>
                                    {errors.orderAddress.message}
                                </p>
                            )}
                        </div>
                        {/* <div className="box-field__row">
                            <div className="box-field">
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="Enter your phone"
                                />
                            </div>
                            <div className="box-field">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your mail"
                                />
                            </div>
                        </div> */}
                    </div>
                    {/* <div className="checkout-form__item">
                        <h4>Delivery Info</h4>

                        <Dropdown
                            options={countries}
                            className="react-dropdown"
                            onChange={(option) => console.log(option.value)}
                            placeholder="Select a country"
                        />
                        <div className="box-field__row">
                            <div className="box-field">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter the city"
                                />
                            </div>
                            <div className="box-field">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter the address"
                                />
                            </div>
                        </div>
                        <div className="box-field__row">
                            <div className="box-field">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Delivery day"
                                />
                            </div>
                            <div className="box-field">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Delivery time"
                                />
                            </div>
                        </div>
                    </div> */}
                    <div className="checkout-form__item">
                        <h4>Ghi Chú</h4>
                        <div className="box-field box-field__textarea">
                            <textarea
                                className="form-control"
                                placeholder="Ghi Chú"
                                {...register("note")}
                            ></textarea>
                        </div>
                        {/* <label className="checkbox-box checkbox-box__sm">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            Create an account
                        </label> */}
                    </div>
                    <div className="checkout-buttons">
                        {/* <button className='btn btn-grey btn-icon'>
              {' '}
              <i className='icon-arrow'></i> back
            </button> */}
                        <button type="submit" className="btn btn-icon btn-next">
                            Hoàn Thành <i className="icon-arrow"></i>
                        </button>
                    </div>
                </form>
            </div>
            {/* <!-- CHECKOUT STEP ONE EOF -->  */}
        </>
    );
};
