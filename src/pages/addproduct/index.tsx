import React, { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ImgSlide from 'src/components/AddProduct/ImgSlide';

import {
  SelectContainer,
  SelectButton,
  SelectBox,
  SelectList
} from 'src/components/SelectBox';
import api from '@utils/api';
import SellerLayout from 'src/components/layouts/SellerLayout';
import { CATEGORY_ENUM } from 'lib/mongoose/models/constants';
import { TextInputBox } from '../../components/Inputs';
import { Buttons } from '../../components';

interface FormInp {
  title: string;
  price: number;
  sale: number;
  deliveryPrice: number;
  stock: number;
}

function AddproductPage() {
  const [text, setText] = useState('');
  // const [modalImg, setModalImg] = useState<string[]>([]);
  const [isSelect, setIsSelect] = useState(false);
  const [contentSelect, setContentSelect] = useState('카테고리 등록');
  const router = useRouter();
  const menu = router.pathname;

  const { register, handleSubmit } = useForm<FormInp>({
    mode: 'onChange'
  });

  const selectCategory = (item: string) => {
    setContentSelect(item);
    setIsSelect((prev) => !prev);
  };

  const addModalImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectImglength = event.target.files;
    if (selectImglength) {
      for (let i = 0; i < selectImglength?.length; i += 1) {
        if (event.target.files && event.target.files[0]) {
          const imgUrl = URL.createObjectURL(selectImglength[i]);
          setText(
            (prev) => `${prev}<img src="${imgUrl}"  style="width:100%"/>`
          );
        }
      }
    }
  };
  const inpEditor = useRef<HTMLInputElement>(null);

  const handle: SubmitHandler<FormInp> = async (data) => {
    console.log(data);
    const POSTDATA = await api.post('/product', {
      productName: data.title,
      price: data.price,
      discount: data.sale,
      stock: data.stock
    });
    console.log(POSTDATA);
  };
  console.log(text);
  console.log(handleSubmit);

  return (
    <SellerLayout menu={menu}>
      <p>상품 이미지</p>
      <main>
        <form onSubmit={handleSubmit(handle)}>
          <ViewBox>
            <ImgSlide />
            <InputBox>
              <TextInputBox
                labelName="상품명"
                maxLength={20}
                hook={{ ...register('title', { required: true }) }}
              />
              <SelectButton
                labelName="카테고리"
                contentSelect={contentSelect}
                isSelect={isSelect}
                onClick={() => setIsSelect((prev) => !prev)}
              />
              <SelectContainer>
                <SelectBox isSelect={isSelect}>
                  {CATEGORY_ENUM.map((item) => {
                    return (
                      <SelectList
                        key={item}
                        onClick={() => selectCategory(item)}
                      >
                        {item}
                      </SelectList>
                    );
                  })}
                </SelectBox>
              </SelectContainer>
              <InputFlexBox>
                <TextInputBox
                  labelName="판매가"
                  option="unit"
                  unit="원"
                  hook={{ ...register('price', { required: true }) }}
                />
                <TextInputBox
                  labelName="할인가"
                  option="unit"
                  unit="원"
                  hook={{ ...register('stock', { required: true }) }}
                />
              </InputFlexBox>

              <Buttons.Custom
                width={22}
                height={5}
                fontSize={2.4}
                color="green"
                disabled={false}
              >
                배송,소포,등기
              </Buttons.Custom>
              <InputFlexBox>
                <TextInputBox
                  labelName="기본 배송비"
                  option="unit"
                  unit="원"
                  hook={{ ...register('deliveryPrice', { required: true }) }}
                />
                <TextInputBox
                  labelName="재고"
                  option="unit"
                  unit="원"
                  hook={{ ...register('sale', { required: true }) }}
                />
              </InputFlexBox>
            </InputBox>
          </ViewBox>
          <button type="submit">클릭 제출</button>
        </form>
        <Editor
          apiKey="velrv8dvpig61i0ewv03ljv8jsy1rwysgrwh814cutgpmd6k"
          value={text}
          onEditorChange={setText}
          init={{
            language: 'ko',
            height: 700,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'add_image | bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent |',
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            setup: (editor) => {
              editor.ui.registry.addButton('add_image', {
                text: '이미지추가',
                onAction: () => {
                  if (inpEditor.current) {
                    inpEditor.current.click();
                  }
                }
              });
            }
          }}
        />

        <ImageInput
          type="file"
          multiple
          accept="image/*"
          onChange={addModalImg}
          ref={inpEditor}
        />
      </main>
    </SellerLayout>
  );
}

const ViewBox = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const InputBox = styled.div`
  flex-basis: 70%;
  margin-left: 4rem;
  & input,
  div {
    margin-bottom: 1rem;
  }
  & > button {
    margin-bottom: 1rem;
  }
`;

const InputFlexBox = styled.div`
  display: flex;
  & > div {
    margin-right: 2rem;
    flex-basis: 25%;
  }
`;

const ImageInput = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
`;

export default AddproductPage;
