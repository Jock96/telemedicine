import { ChangeEventHandler, FC, useState } from "react";
import { Modal, Button, Input, Rate, Flex, Typography } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { ModalProps } from "antd";

export const CommentModal: FC<Pick<ModalProps, "open" | "onCancel">> = ({
  open,
  onCancel,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState<string>();

  const changeComment: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setComment(event.target.value);
  };

  const submit = () => {
    // TODO:
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={onCancel}
      title="Оставьте ваш комментарий по специалисту"
      footer={
        <Button type="primary" onClick={submit}>
          Отправить
        </Button>
      }
    >
      <Flex vertical gap={12}>
        <Input.TextArea
          rows={8}
          placeholder="Комментарий"
          onChange={changeComment}
          value={comment}
        />
        <Flex>
          <Typography.Text>Ваша оценка: </Typography.Text>
          <Rate
            style={{ marginLeft: "auto" }}
            character={<HeartOutlined />}
            value={rating}
            onChange={setRating}
            allowHalf
          />
        </Flex>
      </Flex>
    </Modal>
  );
};
