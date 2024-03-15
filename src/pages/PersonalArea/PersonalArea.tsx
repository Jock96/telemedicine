import { FC, useState } from "react";
import { Card, Flex, Image, Typography } from "antd";
import { Page } from "../../components";
import type { IUser } from "../../entities/user";
import { getFullName } from "../../helpers/getFullName";
import { SPECIALISTS_LIST } from "../../mocks";
import { TooltipWrapper } from "../../components/TooltipWrapper";

const CommonInfo: FC<IUser> = ({
  firstName,
  lastName,
  patronymic,
  phone,
  email,
  photoUrl,
}) => {
  const fullName = getFullName({ firstName, lastName, patronymic });
  // TODO: только два пробела
  const [tempFullName, setTempFullName] = useState(fullName);

  const handleFullNameChange = (value: string) => {
    setTempFullName(value);
  };

  const [tempEmail, setTempEmail] = useState(email);

  const handleEmailChange = (value: string) => {
    setTempEmail(value);
  };

  const [tempPhone, setTempPhone] = useState(phone);

  const handlePhoneChange = (value: string) => {
    setTempPhone(value);
  };

  const handleDownloadPhoto = () => {
    // TODO: Загрузка фото
  };

  return (
    <Flex>
      <TooltipWrapper wrap={!photoUrl} title="Кликните чтобы загрузить фото">
        <Image preview={false} onClick={handleDownloadPhoto} src={photoUrl} />
      </TooltipWrapper>
      <Flex vertical gap={8}>
        <Typography.Text
          strong
          editable={{
            onChange: handleFullNameChange,
            tooltip: false,
          }}
        >
          {tempFullName?.trim() === "" ? fullName : tempFullName}
        </Typography.Text>
        <Flex gap={4}>
          <Typography.Text>Электронная почта:</Typography.Text>
          <Typography.Text
            editable={{
              onChange: handleEmailChange,
              tooltip: false,
            }}
          >
            {tempEmail?.trim() === "" ? email : tempEmail}
          </Typography.Text>
        </Flex>
        <Flex gap={4}>
          <Typography.Text>Номер телефона:</Typography.Text>
          <Typography.Text
            editable={{
              onChange: handlePhoneChange,
              tooltip: false,
            }}
          >
            {tempPhone?.trim() === "" ? phone : tempPhone}
          </Typography.Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const PersonalArea: FC = () => {
  // TODO:
  const user = SPECIALISTS_LIST[0];
  return (
    <Page removeHeader>
      <Card>
        <CommonInfo {...user} />
      </Card>
    </Page>
  );
};
