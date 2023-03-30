import { FC, useState } from "react";
import {
  Image,
  Navigator,
  Picker,
  View,
} from "@tarojs/components";

import Button from "@/components/Button";
import Card from "@/components/Card";
import PageWithoutTopBar from "@/components/PageWithoutTopBar";
import { orgList } from "@/constants/org";
import Checkbox from "@/components/Checkbox";

import { navigateTo } from "@/utils/navigator";
import { showToast } from "@/utils/toast";

import { login } from "@/service";

import IconPolygon from "@/assets/polygon.svg";

import "./index.less";

const title = { main: "益助银龄", tip: "老人居家观护小程序" };
const LoginPageTitle: FC = () => {
  return (
    <View className='login-page-title'>
      <View className='login-page-title-main'>{title.main}</View>
      <View className='login-page-title-tip'>{title.tip}</View>
    </View>
  );
};

const RegisterEntry: FC<{ checked: boolean }> = ({ checked }) => {
  const handleGotoRegister = () => {
    if (!checked) {
      showToast("请先勾选隐私协议");
      return;
    }
    navigateTo("/pagesPersonal/register/index");
  };

  return (
    <View className='login-page-register-entry'>
      <View className='login-page-register-entry-tip'>
        <View className='login-page-register-entry-tip-line' />
        <View className='login-page-register-entry-tip-text'>
          志愿者需先注册
        </View>
      </View>
      <Button type='default' onClick={handleGotoRegister}>
        志愿者注册
      </Button>
    </View>
  );
};

const UserAgree: FC<{
  value: boolean;
  onChange: (v: boolean) => void;
}> = ({ value, onChange }) => {
  return (
    <View className='login-page-user-agree'>
      <Checkbox value={value} onChange={onChange} />
      <View className='login-page-user-agree-privacy'>
        登录或注册代表您已同意{" "}
        <Navigator
          className='login-page-user-agree-doc'
          url='/pagesPersonal/serviceAgreement/index'
        >
          用户协议
        </Navigator>
        、
        <Navigator
          className='login-page-user-agree-doc'
          url='/pagesPersonal/privacyPolicy/index'
        >
          隐私政策
        </Navigator>
      </View>
    </View>
  );
};

const LoginPage: FC = () => {
  const [org, setOrg] = useState(1);

  const [checked, setChecked] = useState(false);

  const handleGetPhoneNumber = async (e) => {
    const cloudID = e.detail.cloudID;
    await login({ cloudId: cloudID, orgId: orgList[org].id });
  };

  return (
    <PageWithoutTopBar>
      <Card style={{ position: "relative" }}>
        <Picker
          mode='selector'
          range={orgList.map((item) => item.name)}
          value={org}
          onChange={(e) => setOrg(e.detail.value as number)}
        >
          <View className='org-selector'>
            <View>{orgList[org].name || "选择所属机构"}</View>
            <Image className='icon-polygon' src={IconPolygon} />
          </View>
        </Picker>
        <LoginPageTitle />
        {checked ? (
          <Button
            openType='getPhoneNumber'
            onGetPhoneNumber={handleGetPhoneNumber}
            className='login-btn'
            type='primary'
          >
            微信手机号登录
          </Button>
        ) : (
          <Button
            onClick={() => showToast("请先勾选隐私协议")}
            className='login-btn'
            type='primary'
          >
            微信手机号登录
          </Button>
        )}

        <RegisterEntry checked={checked} />
        <UserAgree value={checked} onChange={(v) => setChecked(v)} />
      </Card>
    </PageWithoutTopBar>
  );
};

export default LoginPage;
