import { FC, useState } from "react";
import { SPECIALIZATIONS } from "../../../../mocks";
import {
  Tag,
  Flex,
  Popconfirm,
  Tooltip,
  Typography,
  Collapse,
  Modal,
  Radio,
  Button,
  InputNumber,
} from "antd";
import { CloseOutlined, SettingOutlined } from "@ant-design/icons";
import type { ISpecialization, IWorkDuration } from "../../../../entities";
import {
  MAX_WORK_DURATION_HOURS,
  MAX_WORK_DURATION_MINUTES,
  MIN_WORK_DURATION_HOURS,
  MIN_WORK_DURATION_MINUTES,
  SpecializationsKey,
} from "./constants";
import { AddSpecialization } from "./components";
import type { RadioChangeEvent } from "antd/es/radio";
import {
  RECOMEND_TIME_DURATION,
  TIME_SELECT_TYPE,
} from "../../../../constants";
import { recomendTimeLabelGenerator } from "../../../../helpers";
import { useMediaContext } from "../../../../contextes";

export const Specializations: FC = () => {
  const { isMobile } = useMediaContext();

  // TODO: получать с сервера
  const [first, second, third, fourth, fifth, ...rest] = SPECIALIZATIONS;
  const specializations = [first, second, third, fourth, fifth];
  const availableSpecializations = rest;

  const canDelete = specializations.length > 1;

  const [deletedSpecialization, setDeletedSpecialization] =
    useState<ISpecialization>();

  const handleClose = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    specialization: ISpecialization
  ) => {
    event.preventDefault();

    setDeletedSpecialization(specialization);
  };

  const handleCancelDelete = () => {
    setDeletedSpecialization(undefined);
  };

  const handleConfirmDelete = () => {
    // TODO:
    console.log("deletedSpecialization", deletedSpecialization);
    setDeletedSpecialization(undefined);
  };

  const handleAddSpecialization = (specialization: ISpecialization) => {
    // TODO:
    console.log("addedSpecialization", specialization);
  };

  const initialActiveKey = window.localStorage.getItem(SpecializationsKey);
  const [activeKey, setActiveKey] = useState<string | null>(initialActiveKey);

  const handleChange = (key: string | string[]) => {
    const value = Array.isArray(key) ? key[0] : key;
    setActiveKey(value ? value : null);

    if (value) {
      window.localStorage.setItem(SpecializationsKey, value);
    } else {
      window.localStorage.removeItem(SpecializationsKey);
    }

    handleCancelDelete();
  };

  const [configuredSpecialization, setConfiguredSpecialization] =
    useState<ISpecialization>();

  const handleSettingsOpen = (specialization: ISpecialization) => {
    setConfiguredSpecialization(specialization);
  };

  const handleSettingsClose = () => {
    setConfiguredSpecialization(undefined);
  };

  const [timeSelectType, setTimeSelectType] = useState(
    TIME_SELECT_TYPE.RECOMEND
  );

  const [customDurationValue, setCustomDurationValue] = useState<
    IWorkDuration["value"] | undefined
  >();

  const handleCustomDurationChange = (value?: IWorkDuration["value"]) => {
    setCustomDurationValue((prevValue) => ({ ...prevValue, ...value }));
  };

  const handleTimeTypeChange = ({ target }: RadioChangeEvent) =>
    setTimeSelectType(target.value as TIME_SELECT_TYPE);

  const handleDurationConfirm = (value?: IWorkDuration["value"]) => {
    if (!value) {
      // TODO:
      console.log("configuredSpecialization", configuredSpecialization);
      console.log("time", customDurationValue);
    } else {
      // TODO:
      console.log("configuredSpecialization", configuredSpecialization);
      console.log("time", value);
    }

    handleSettingsClose();
  };

  const disabled =
    !customDurationValue ||
    Object.values(customDurationValue).every((value) => value === undefined);

  return (
    <>
      <Collapse
        ghost
        activeKey={activeKey ?? undefined}
        onChange={handleChange}
        items={[
          {
            key: SpecializationsKey,
            label: (
              <Flex gap={4}>
                <Typography.Text strong>{`Специализации${
                  !activeKey ? ":" : ""
                }`}</Typography.Text>
                {!activeKey &&
                  specializations.map((specialization) => (
                    <Tag key={specialization}>{specialization}</Tag>
                  ))}
              </Flex>
            ),
            children: (
              <Flex gap={8} wrap="wrap">
                {specializations.map((specialization) => (
                  <Popconfirm
                    open={deletedSpecialization === specialization}
                    key={specialization}
                    title="Удалить специализацию"
                    description="Вы уверены что хотите удалить специализацию?"
                    okText="Да"
                    cancelText="Нет"
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    zIndex={2000}
                  >
                    <Tag
                      style={{ display: "flex" }}
                      icon={
                        <Tooltip
                          trigger={["hover"]}
                          title="Настроить длительность консультации"
                        >
                          <SettingOutlined
                            onClick={() => handleSettingsOpen(specialization)}
                          />
                        </Tooltip>
                      }
                      closable={canDelete}
                      onClose={(event) => handleClose(event, specialization)}
                      closeIcon={
                        canDelete && (
                          <Tooltip trigger={["hover"]} title="Удалить">
                            <CloseOutlined />
                          </Tooltip>
                        )
                      }
                    >
                      {specialization}
                    </Tag>
                  </Popconfirm>
                ))}
                {!!availableSpecializations.length && (
                  <AddSpecialization
                    specializations={availableSpecializations}
                    onAdd={handleAddSpecialization}
                  />
                )}
              </Flex>
            ),
          },
        ]}
      />
      <Modal
        title={`Выбрать длительность консультации по специализации ${configuredSpecialization}`}
        open={!!configuredSpecialization}
        footer={null}
        onCancel={handleSettingsClose}
        width="100%"
        centered
        zIndex={2000}
      >
        <Flex vertical gap={8}>
          <Radio.Group
            onChange={handleTimeTypeChange}
            value={timeSelectType}
            defaultValue={TIME_SELECT_TYPE.RECOMEND}
            style={{ display: "flex" }}
          >
            <Radio.Button
              style={{ flex: 1, display: "flex", justifyContent: "center" }}
              value={TIME_SELECT_TYPE.RECOMEND}
            >
              Рекомендуемое
            </Radio.Button>
            <Radio.Button
              style={{ flex: 1, display: "flex", justifyContent: "center" }}
              value={TIME_SELECT_TYPE.SELF}
            >
              Самостоятельно
            </Radio.Button>
          </Radio.Group>
          <Flex gap={8} wrap="wrap" justify={isMobile ? "center" : undefined}>
            {timeSelectType === TIME_SELECT_TYPE.RECOMEND &&
              RECOMEND_TIME_DURATION.map((value) => (
                <Button
                  type="dashed"
                  key={`${value.hours}${value.minutes}`}
                  onClick={() => handleDurationConfirm(value)}
                >
                  {recomendTimeLabelGenerator(value)}
                </Button>
              ))}
            {timeSelectType === TIME_SELECT_TYPE.SELF && (
              <Flex vertical gap={8} style={{ width: "100%" }}>
                <Flex gap={8} align="center">
                  <InputNumber
                    value={
                      customDurationValue
                        ? customDurationValue?.hours
                        : undefined
                    }
                    type="number"
                    style={{ flex: 1 }}
                    min={MIN_WORK_DURATION_HOURS}
                    max={MAX_WORK_DURATION_HOURS}
                    maxLength={2}
                    placeholder="0"
                    onChange={(hours) =>
                      handleCustomDurationChange({ hours: hours ?? undefined })
                    }
                    variant="borderless"
                    // TODO: plural
                    addonAfter="часов"
                  />
                  <InputNumber
                    value={
                      customDurationValue
                        ? customDurationValue?.minutes
                        : undefined
                    }
                    type="number"
                    style={{ flex: 1 }}
                    min={MIN_WORK_DURATION_MINUTES}
                    max={MAX_WORK_DURATION_MINUTES}
                    maxLength={2}
                    placeholder="0"
                    onChange={(minutes) =>
                      handleCustomDurationChange({
                        minutes: minutes ?? undefined,
                      } as IWorkDuration["value"])
                    }
                    variant="borderless"
                    // TODO: plural
                    addonAfter="минут"
                  />
                </Flex>
                <Button
                  block
                  type="primary"
                  disabled={disabled}
                  onClick={() => handleDurationConfirm()}
                >
                  Подтвердить
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};
