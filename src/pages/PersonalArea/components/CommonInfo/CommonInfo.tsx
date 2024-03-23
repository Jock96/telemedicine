import { FC, useState } from "react";
import { Flex, Image, Typography } from "antd";
import type { IUser } from "../../../../entities";
import { getFullName } from "../../../../helpers/getFullName";
import { TooltipWrapper } from "../../../../components/TooltipWrapper";
import { useMediaContext } from "../../../../contextes";

export const CommonInfo: FC<IUser & { canEdit?: boolean }> = ({
  firstName,
  lastName,
  patronymic,
  phone,
  email,
  photoUrl,
  canEdit = true,
}) => {
  const { isMobile } = useMediaContext();

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
    <Flex vertical={isMobile} align={isMobile ? "center" : undefined} gap={8}>
      {isMobile && (
        <Typography.Text
          strong
          editable={
            canEdit
              ? {
                  onChange: handleFullNameChange,
                  tooltip: false,
                }
              : undefined
          }
        >
          {tempFullName?.trim() === "" ? fullName : tempFullName}
        </Typography.Text>
      )}
      <TooltipWrapper wrap={!photoUrl} title="Кликните чтобы загрузить фото">
        <Image
          preview={false}
          onClick={handleDownloadPhoto}
          src={photoUrl}
          style={{ width: isMobile ? "200px" : "300px" }}
        />
      </TooltipWrapper>
      <Flex vertical gap={8}>
        {!isMobile && (
          <Typography.Text
            strong
            editable={
              canEdit
                ? {
                    onChange: handleFullNameChange,
                    tooltip: false,
                  }
                : undefined
            }
          >
            {tempFullName?.trim() === "" ? fullName : tempFullName}
          </Typography.Text>
        )}
        <Flex gap={4}>
          <Typography.Text>Электронная почта:</Typography.Text>
          <Typography.Text
            editable={
              canEdit
                ? {
                    onChange: handleEmailChange,
                    tooltip: false,
                  }
                : undefined
            }
          >
            {tempEmail?.trim() === "" ? email : tempEmail}
          </Typography.Text>
        </Flex>
        <Flex gap={4}>
          <Typography.Text>Номер телефона:</Typography.Text>
          <Typography.Text
            editable={
              canEdit
                ? {
                    onChange: handlePhoneChange,
                    tooltip: false,
                  }
                : undefined
            }
          >
            {tempPhone?.trim() === "" ? phone : tempPhone}
          </Typography.Text>
        </Flex>
        {/* TODO: другие каналы связи */}
      </Flex>
    </Flex>
  );
};
