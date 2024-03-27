import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import storage from "services/Storage";
import api from "services/Api";

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import Verify from "./pass-chang-sucs.png";

const ChangedPassword = () => {
  const [showPassword, setShowPassword] = useState();

  const toogleEye = () => {
    setShowPassword(!showPassword);
  };
  return (
    <React.Fragment>
      <Container fluid className=" overflow-hidden">
        <div>
          <div className="p-3 pt-sm-5  text-start">
            <span className="plenome-hospital-text">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="37"
                  height="37"
                  viewBox="0 0 37 37"
                  fill="none"
                >
                  <g clip-path="url(#clip0_54_7738)">
                    <g filter="url(#filter0_d_54_7738)">
                      <path
                        d="M18.7316 2.27599C9.9951 2.29615 2.92844 9.38866 2.94859 18.1167C2.96873 26.8447 10.0681 33.9046 18.8045 33.8844C27.541 33.8642 34.6076 26.7717 34.5875 18.0437C34.5674 9.31564 27.468 2.25582 18.7316 2.27599ZM18.8007 32.2094C10.9894 32.2274 4.64323 25.9166 4.62522 18.1128C4.60721 10.3091 10.9242 3.96759 18.7354 3.94956C26.5467 3.93153 32.8929 10.2424 32.9109 18.0461C32.9289 25.8498 26.6119 32.1899 18.8006 32.2079L18.8007 32.2094Z"
                        fill="url(#paint0_linear_54_7738)"
                      />
                    </g>
                    <path
                      d="M20.401 32.1132C28.1596 31.2119 33.7179 24.1978 32.8158 16.4466C31.9137 8.69551 24.8928 3.14261 17.1342 4.04388C9.37554 4.94515 3.81724 11.9593 4.71935 19.7104C5.62146 27.4616 12.6424 33.0145 20.401 32.1132Z"
                      fill="url(#paint1_linear_54_7738)"
                    />
                    <path
                      d="M13.6411 21.6953C14.9843 20.8764 15.733 19.7131 15.8293 18.1319C15.851 18.1319 15.8901 18.1318 15.9306 18.1317C17.3134 18.1285 18.6961 18.1166 20.0788 18.1264C20.6145 18.131 21.1109 18.0069 21.5794 17.7642C22.2389 17.4228 22.7517 16.9298 23.0629 16.2464C23.3553 15.602 23.3871 14.938 23.219 14.2542C22.9983 13.355 22.4481 12.727 21.6219 12.3456C21.1886 12.1456 20.7192 12.0439 20.2371 12.0364C19.6955 12.0289 19.154 12.0099 18.614 12.0257C18.2173 12.0367 17.8147 12.0261 17.4284 12.1398C16.3244 12.4678 15.6152 13.1739 15.4122 14.3243C15.3422 14.7193 15.3344 15.1301 15.3296 15.5323C15.3222 16.0993 15.3539 16.6677 15.3509 17.2362C15.349 17.6846 15.353 18.1373 15.299 18.5815C15.208 19.318 14.8561 19.935 14.3361 20.4627C13.8045 21.0021 13.1916 21.3998 12.4478 21.578C12.0903 21.6627 11.7284 21.6838 11.3621 21.6745C11.2955 21.6732 11.2766 21.6487 11.2808 21.5807C11.2961 21.3131 11.3099 21.044 11.3166 20.7764C11.327 20.2802 11.3302 19.7826 11.3392 19.2864C11.3549 18.5458 11.3647 17.8037 11.3934 17.0631C11.418 16.4106 11.4527 15.7582 11.5033 15.1072C11.5497 14.5285 11.6107 13.9497 11.6904 13.3738C11.8072 12.5361 12.1356 11.7773 12.635 11.0992C13.5299 9.88502 14.7211 9.08815 16.1593 8.65233C16.8263 8.44973 17.5109 8.38017 18.2044 8.36555C18.7662 8.35413 19.3279 8.33692 19.8897 8.34719C20.5963 8.36003 21.3058 8.37575 21.9997 8.53904C23.2355 8.83128 24.2909 9.43492 25.2022 10.321C26.0584 11.155 26.634 12.1431 26.9581 13.2851C27.1362 13.9153 27.197 14.5603 27.1768 15.2142C27.1471 16.1487 26.9509 17.0503 26.5561 17.8974C26.0072 19.0776 25.2059 20.05 24.0897 20.7397C23.2323 21.2696 22.2947 21.5524 21.2857 21.614C20.2593 21.6757 19.2329 21.7186 18.2034 21.718C17.2058 21.7175 16.2097 21.7226 15.2121 21.7235C14.7053 21.7247 14.1971 21.7143 13.6903 21.7097C13.6846 21.7097 13.6773 21.7053 13.644 21.6939L13.6411 21.6953ZM11.2197 22.0726C11.2315 22.1666 11.2418 22.2621 11.258 22.3546C11.3329 22.813 11.8817 23.4829 12.5288 23.4337C12.9573 23.4008 13.3931 23.4215 13.8232 23.448C14.2779 23.4773 14.6537 23.7947 14.7459 24.2299C14.8337 24.6434 14.8376 25.0657 14.785 25.4882C14.7068 26.1133 14.0708 26.582 13.4509 26.4735C12.8613 26.3692 12.4286 25.8264 12.4461 25.2608C12.4609 24.7819 12.4468 24.3017 12.4486 23.8215C12.4484 23.7347 12.4252 23.7 12.3296 23.6887C11.9414 23.6404 11.6123 23.4647 11.3395 23.1847C11.3047 23.1486 11.2742 23.1067 11.2292 23.0533C11.2182 23.3181 11.1985 23.5582 11.2019 23.7983C11.2105 24.3827 11.2292 24.9685 11.2451 25.5528C11.2609 26.1213 11.4387 26.63 11.8421 27.0399C12.5097 27.7167 13.324 27.9738 14.24 27.7388C15.2037 27.4921 15.8103 26.834 16.0064 25.863C16.1353 25.2291 16.1222 24.5724 15.9904 23.9363C15.8528 23.2784 15.4751 22.7701 14.8981 22.4128C14.5515 22.198 14.1619 22.1454 13.7738 22.1246C12.9282 22.0774 12.0825 22.0547 11.2369 22.022C11.2283 22.048 11.2182 22.0611 11.2197 22.0726Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_54_7738"
                      x="-0.911785"
                      y="0.474565"
                      width="36.7867"
                      height="36.7564"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dx="-1.287" dy="0.772201" />
                      <feGaussianBlur stdDeviation="1.287" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0.294118 0 0 0 0 0.556863 0 0 0 0.12 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_54_7738"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_54_7738"
                        result="shape"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_54_7738"
                      x1="18.8031"
                      y1="33.8829"
                      x2="18.7301"
                      y2="2.27455"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#070735" />
                      <stop offset="1" stop-color="#6ABAFF" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_54_7738"
                      x1="-4.6371"
                      y1="-0.901456"
                      x2="45.9556"
                      y2="40.2095"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#070735" />
                      <stop offset="1" stop-color="#6ABAFF" />
                    </linearGradient>
                    <clipPath id="clip0_54_7738">
                      <rect
                        width="36"
                        height="36"
                        fill="white"
                        transform="translate(0 0.560547) rotate(-0.132238)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </span>{" "}
              Plenome Hospitals
            </span>
          </div>
        </div>
        <Row>
          <Col
            lg="12"
            className="d-flex justify-content-center align-items-center"
            style={{ height: "80vh" }}
          >
            <div>
              <img
                src={Verify}
                className="mb-3 password-changed-img"
                alt="Verified_img"
              />{" "}
              <br />
              <span className="text-center password-changed-text ">
                Password changed successfully
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default withRouter(ChangedPassword);
