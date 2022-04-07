import React from 'react';
import PaypalExpressBtn from 'react-paypal-checkout';
 
export default class PaypalButton extends React.Component {
    render() {
        const onSuccess = (payment) => {
            // Mọi thứ đều ổn
            console.log("Thanh toán thành công!", payment);
            this.props.tranSuccess(payment)
        }

        const onCancel = (data) => {
            // Người dùng nhấn" Cancel" hoặc đóng cửa sổ thanh toán lại!
            console.log('Thanh toán đã bị hủy!', data);
        }
        const onError = (err) => {
            // Không thể tải tệp lệnh chính
            console.log("Lỗi!", err);
            // Vì tệp lệnh chính của Paypal được tải không đồng bộ từ "https://www.paypalobjects.com/api/checkout.js"
            // => Mất 0,5s để mọi thứ được thiết lập và xuất hiện
        }
 
        let env = 'sandbox'; 
        let currency = 'USD'; 
        let total = this.props.total; // Tổng số tiền được thanh toán bằng cách sử dụng phương thức Paypal
        // Tài liệu về tiền: https://developer.paypal.com/docs/classic/api/currency_codes/
 
        const client = {
            sandbox:    'YOUR-sandbox-APP-ID',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/
 
        // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
        let style = {
            size: 'small',
            color: 'blue',
            shape: 'rect',
            label: 'checkout',
            tagline: false
        }

        return (
            <PaypalExpressBtn 
            env={env} client={client} 
            currency={currency} 
            total={total} onError={onError} 
            onSuccess={onSuccess} onCancel={onCancel}
            style={style} />
        );
    }
}