import { useState, useEffect } from "react";
import axios from "axios";

function UserAPI(token) {
  //!Check token của người dùng
  const [islogged, setislogged] = useState(false); //?Giá trị ban đầu chưa đăng nhập
  const [isAdmin, setIsAdmin] = useState(false); //?Chưa phải admin
  const [cart, setCart] = useState([]); //!Tạo giỏ hàng rỗng
  const [history, setHistory] = useState([]);
  

  useEffect(() => {
    if (token) {
      //!Check token để xác thực người dùng bình thường hay là Admin
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });

          setislogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false); //*check role để set admin

          setCart(res.data.cart); //!Trả về giỏ hàng
        } catch (err) {
          window.alert(err.respond.data.msg);
        }
      };
      getUser();
    }
  }, [token])

  const addCart = async (product) => {
    //?Check logged để có thể trả về giỏ hàng
    if (!islogged) return alert("Hãy đăng nhập để tiếp tục mua sắm");

    const checkcart = cart.every(item => {
      return item._id !== product._id;
    });
    if (checkcart) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        "user/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        { headers: { Authorization: token } }
      );
    }
    else {
      alert("Mặt hàng đã được thêm vào giỏ hàng")
    }
  };

  return {
    islogged: [islogged, setislogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory]
  };
}

export default UserAPI;
