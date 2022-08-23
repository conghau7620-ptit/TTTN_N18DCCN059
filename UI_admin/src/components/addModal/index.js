import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import "./style.scss";
function AddModal({ title, isOpen, setIsOpen, handleAdd }) {
    const [name, setName] = useState("");
    const [active, setActive] = useState(1);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };
    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h2 id="parent-modal-title">Thêm {title}</h2>
                <form>
                    <div className="formInput">
                        <label>Tên</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="formInput">
                        <label>Hoạt Động</label>
                        <select
                            onChange={(e) => setActive(e.target.value)}
                            value={active}
                        >
                            <option value="1">Có</option>
                            <option value="0">Không</option>
                        </select>
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleAdd(name, Boolean(Number(active)));
                        }}
                    >
                        Tạo
                    </button>
                </form>
            </Box>
        </Modal>
    );
}

export default AddModal;
