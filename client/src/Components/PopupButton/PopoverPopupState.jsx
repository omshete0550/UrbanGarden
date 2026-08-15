import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function PopoverPopupState() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleClick = (e) => {
    dispatch(logOut());
  };
  const navigate = useNavigate();
  const handleClick1 = (e) => {
    navigate("/Login");
  };
  const handleClick2 = (e) => {
    navigate(`/UserProfile/${user?.details.username}`);
  };
  const handleClick3 = (e) => {
    navigate(`/nursery/${(user?.details?.nurseryId || user?.details?.nursuries)}`);
  };
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          {user ? (
            <Button
              variant="contained"
              sx={{
                marginTop: "5px",
                zIndex: "999999999",
                width: "9em",
                backgroundColor: "#61b76e",
              }}
              {...bindTrigger(popupState)}
            >
              <i style={{ marginRight: "1em" }}>
                <FaUser />
              </i>{" "}
              {user?.details.username}
            </Button>
          ) : (
            <div onClick={handleClick1}>Login</div>
          )}
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography sx={{ p: 2 }}>
              <Button style={{ color: "#000" }} onClick={handleClick2}>
                Your Account
              </Button>
            </Typography>
            {user?.isAdmin && (
              <Typography sx={{ p: 2 }}>
                <Button style={{ color: "#000" }} onClick={handleClick3}>
                  Your Nursery
                </Button>
              </Typography>
            )}
            <Typography sx={{ p: 2 }}>
              <Button style={{ color: "#000" }}>Your Orders</Button>
            </Typography>
            <Typography sx={{ p: 2 }}>
              <Button style={{ color: "#000" }}>Your Wishlist</Button>
            </Typography>
            <Typography sx={{ p: 2 }}>
              <Button style={{ color: "#000" }} onClick={handleClick}>
                Logout
              </Button>
            </Typography>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

