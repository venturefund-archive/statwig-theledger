import React, { useState } from 'react';
import axios from 'axios';
import ProductsTableReview from './productsReview';
import { useSelector, useDispatch } from 'react-redux';
import { createPO, setEditPos, resetEditPos } from '../../actions/poActions';
import Pen from '../../assets/icons/po.svg';
import Modal from '../../shared/modal';
import PoPopUp from './poPopUp';
import './style.scss';

const tableHeader = ['Material Id','Product Name', 'Manufacturer', 'Quantity','UnitPrice'];

const PurchaseFormReview = props => {
  const dispatch = useDispatch();
  const month = new Date().getMonth() + 1;
  const todayDate =
    new Date().getDate() + '/' + month + '/' + new Date().getFullYear();
  const [openCreatedPo, setOpenCreatedPo] = useState(false);
  const [ modalProps, setModalProps ] = useState({});
  const reviewPo = useSelector(state => {
    return state.reviewPo;
  });
  const [ cashfreeData, setCashfreeData] = useState({});
  const closeModal = () => {
    props.setEditMode(false);
  };

  const onEdit = () => {
    dispatch(setEditPos(reviewPo));
    props.setEditMode(true);
  };

  const onAssign = async () => {
    const data = reviewPo;
    const result = await createPO(data);
    setOpenCreatedPo(true);
    if (result.status == 200) {
      dispatch(resetEditPos());

      setModalProps({
        message: 'Click Pay!',
        productId: result.data.orderID,
        type: 'Success'
      });
      onCashfreeClick(data.data.orderAmount)
    }else if(result.status === 500) {
      setModalProps({
        message: result.data.message,
        productId: result.data.orderID,
        type: 'Failure'
      })
    }
  };
  const onCashfreeClick = async (orderAmount) => {
    const data = {
      orderAmount: orderAmount,
      orderCurrency: 'INR',
      orderNote: 'test optional Text',
      customerName: 'John Doe',
      customerEmail: 'Johndoe@test.com',
      customerPhone: '9999999999',
    };
    try {
      const result = await axios.post(
        'https://payment.vaccineledger.com/request',
        data,
      );
      if (result) {
        const postData = result.data.postData;
        setCashfreeData(postData);
        //const postResult = await axios.post('https://test.cashfree.com/billpay/checkout/post/submit', postData);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="purchaseform">
        <p className="date-alignment">Date: {todayDate}</p>
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label className="reference">Send PO To</label>
          <input
            disabled
            type="text"
            className="form-control"
            value={reviewPo.data.sendpoto.name}
          />
        </div>
        <div className="input-group">
          <label className="reference">Vendor Id</label>
          <input
            disabled
            type="text"
            className="form-control"
            value={reviewPo.data.vendor}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label className="reference">Purchase Order Id</label>
           <input
            disabled
            type="text"
            className="form-control"
            value={reviewPo.data.orderID}
          />
        </div>
        <div className="input-group">
          <label className="reference">Vendor Name</label>
          <input
            disabled
            type="text"
            className="form-control"
            value={reviewPo.data.vendorName}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label className="reference">Receiver</label>
          <input
            disabled
            type="text"
            className="form-control"
            value={reviewPo.data.receiver.name}
          />
        </div>
        <div className="input-group">
          <label className="reference">To Location Id</label>
          <input
            disabled
            type="text"
            className="form-control"
            value={reviewPo.data.plant}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label className="reference">Shipped From</label>
          <input
            disabled
            type="text"
            className="form-control"
            value={reviewPo.data.incoterms2}
          />
        </div>
        <div className="input-group">
          <label className="reference">To Location</label>
          <input
            disabled
            type="text"
            className="form-control"
            value={reviewPo.data.destination}
          />
        </div>
      </div>
      <ProductsTableReview
        tableHeader={tableHeader}
        products={reviewPo.data.products}
        materialId={reviewPo.data.material}
      />
      <form
        id="redirectForm"
        method="post"
        action="https://test.cashfree.com/billpay/checkout/post/submit"
      >
        <input type="hidden" name="appId" value={cashfreeData.appId} />
        <input type="hidden" name="orderId" value={cashfreeData.orderId} />
        <input
          type="hidden"
          name="orderAmount"
          value={cashfreeData.orderAmount}
        />
        <input
          type="hidden"
          name="orderCurrency"
          value={cashfreeData.orderCurrency}
        />
        <input
          type="hidden"
          name="orderNote"
          value={cashfreeData.orderNote}
        />
        <input
          type="hidden"
          name="customerName"
          value={cashfreeData.customerName}
        />
        <input
          type="hidden"
          name="customerEmail"
          value={cashfreeData.customerEmail}
        />
        <input
          type="hidden"
          name="customerPhone"
          value={cashfreeData.customerPhone}
        />
        <input
          type="hidden"
          name="returnUrl"
          value={cashfreeData.returnUrl}
        />
        <input
          type="hidden"
          name="notifyUrl"
          value={cashfreeData.notifyUrl}
        />
        <input
          type="hidden"
          name="signature"
          value={cashfreeData.signature}
        />
        <input
          type="hidden"
          name="vendorSplit"
          value={cashfreeData.vendorSplit}
        />
        <input
          type="submit"
          value="Pay"
          className="btn btn-orange review"
          disabled={!cashfreeData.appId}
        />
      </form>
      <button className="btn btn-orange review " onClick={onAssign}>
        MAKEPAYMENT
      </button>

      <button className="btn edit mr-4" onClick={onEdit}>
        <img src={Pen} width="15" height="15" className=" mr-2" />
        <span>EDIT</span>
      </button>

      {openCreatedPo && (
        <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <PoPopUp
            onHide={() => setOpenCreatedPo(false)}
            {...modalProps}
          />
        </Modal>
      )}
    </div>
  );
};

export default PurchaseFormReview;
