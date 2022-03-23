import { useState, useEffect } from "react";
import axios from "axios";

function UserAPI(token) {
  //!Check token của người dùng
  const [islogged, setislogged] = useState(false); //?Giá trị ban đầu chưa đăng nhập
  const [isAdmin, setisAdmin] = useState(false); //?Chưa phải admin
  const [cart, setcart] = useState([]); //!Tạo giỏ hàng rỗng
  const [history, sethistory] = useState([]);

  useEffect(() => {
    if (token) {
      //!Check token để xác thực người dùng bình thường hay là Admin
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });

          setislogged(true);
          res.data.role === 1 ? setisAdmin(true) : setisAdmin(false); //*check role để set admin

          setcart(res.data.cart); //!Trả về giỏ hàng
        } catch (err) {
          window.alert(err.respond.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  const addCart = async (product) => {
    //?Check logged để có thể trả về giỏ hàng
    if (!islogged) return alert("Hãy đăng nhập để tiếp tục mua sắm");

    const checkcart = cart.every((item) => {
      return item._id !== product._id;
    });
    if (checkcart) {
      setcart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        "user/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        { headers: { Authorization: token } }
      );
    }
  };

  return {
    islogged: [islogged, setislogged],
    isAdmin: [isAdmin, setisAdmin],
    cart: [cart, setcart],
    history: [history, sethistory],
  };
}

export default UserAPI;
