import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import {
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  formState: ArticleStateType;
  onFormChange: (state: ArticleStateType) => void;
  onApply: () => void;
  onReset: () => void;
};

export const ArticleParamsForm = ({
  formState,
  onFormChange,
  onApply,
  onReset,
}: ArticleParamsFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const asideRef = useRef<HTMLElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    if (isOpen) setIsOpen(false);
  };

  useOutsideClickClose({
    isOpen,
    rootRef: asideRef as React.RefObject<HTMLDivElement>,
    onClose: handleClose,
    onChange: setIsOpen,
  });

  const handleChange = (field: keyof ArticleStateType) => (option: any) => {
    onFormChange({
      ...formState,
      [field]: option,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply();
  };

  const handleFormReset = () => {
    onReset();
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={handleToggle} />
      <aside 
        ref={asideRef}
        className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
      >
        <form 
          className={styles.form}
          onSubmit={handleSubmit}
          onReset={handleFormReset}
        >
          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={handleChange('fontFamilyOption')}
          />

          <Select
            title="Цвет текста"
            selected={formState.fontColor}
            options={fontColors}
            onChange={handleChange('fontColor')}
          />

          <Select
            title="Цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={handleChange('backgroundColor')}
          />

          <Select
            title="Ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={handleChange('contentWidth')}
          />

          <Select
            title="Размер шрифта"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            onChange={handleChange('fontSizeOption')}
          />

          <div className={styles.bottomContainer}>
            <Button title='Сбросить' htmlType='reset' type='clear' />
            <Button title='Применить' htmlType='submit' type='apply' />
          </div>
        </form>
      </aside>
    </>
  );
};