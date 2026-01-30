import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

import {
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  defaultArticleState,
  ArticleStateType,
  OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  currentArticleState: ArticleStateType;
  onArticleStateChange: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  currentArticleState,
  onArticleStateChange,
}: ArticleParamsFormProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(currentArticleState);
  const asideRef = useRef<HTMLElement>(null);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClose = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };

  useOutsideClickClose({
    isOpen: isMenuOpen,
    rootRef: asideRef as React.RefObject<HTMLDivElement>,
    onClose: handleClose,
    onChange: setIsMenuOpen,
  });

  const handleChange = (field: keyof ArticleStateType) => (option: OptionType) => {
    setFormState({
      ...formState,
      [field]: option,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onArticleStateChange(formState);
  };

  const handleReset = () => {
    const resetState = defaultArticleState;
    setFormState(resetState);
    onArticleStateChange(resetState);
  };

  return (
    <>
      <ArrowButton isOpen={isMenuOpen} onClick={handleToggle} />
      <aside 
        ref={asideRef}
        className={`${styles.container} ${isMenuOpen ? styles.container_open : ''}`}
      >
        <form 
          className={styles.form}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          
          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={handleChange('fontFamilyOption')}
          />

          <RadioGroup
            title="Размер шрифта"
            name="fontSize"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            onChange={handleChange('fontSizeOption')}
          />

          <Select
            title="Цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={handleChange('fontColor')}
          />

          <Separator />

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

          <div className={styles.bottomContainer}>
            <Button title='Сбросить' htmlType='reset' type='clear' />
            <Button title='Применить' htmlType='submit' type='apply' />
          </div>
        </form>
      </aside>
    </>
  );
};