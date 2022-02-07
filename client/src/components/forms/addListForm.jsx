import React, {useRef, useState} from 'react';
import Badge from "../common/Badge";
import '../../css/addListForm.scss';
import imgAdd from "../../assets/img/add.svg";
import imgClose from "../../assets/img/close.svg";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import Button from "../common/Button";
import {useForm} from "../hooks/useForm";
import TextField from "../common/textField";
import {useOutsideAlerter} from "../hooks/useOutsideAlerter";
import {colors} from "../constants/colors";
import {getCurrentUserId} from "../../redux/reducers/authReducer";
import {postNewList} from "../../redux/reducers/listsReducer";

const AddListForm = () => {
  const wrapperRef = useRef(null);
  const userId = useSelector(getCurrentUserId())
  const dispatch = useDispatch()
  const {form, handleChange} = useForm({
    categoryName: ''
  })
  const [hiddenPopup, setHiddenPopup] = useState(false)
  const [selectedColor, setSelectedColor] = useState(1)
  const isLoading = useSelector(state => state.lists.isLoading.addList)
  const onClose = () => {
    setHiddenPopup(false)
    handleChange({categoryName: "", value: ''})
    setSelectedColor(colors[0].id)
  }
  useOutsideAlerter(wrapperRef, onClose)
  const addList = () => {
    if (!form.categoryName) {
      toast.info('Введите название категории!')
      return
    }
    const color = colors.find(c => c.id === selectedColor)
    const newList = {
      name: form.categoryName,
      userId: userId,
      color: color.hex
    }
    console.log(newList)
    dispatch(postNewList(newList, onClose))
  }

  return (
    <div ref={wrapperRef} className="add__list">
      <ul className="list">
        <li onClick={() => setHiddenPopup(!hiddenPopup)}
            className='add__list-item'>
          <i>
            <img src={imgAdd} alt="Add icon"/>
          </i>
          <span>Добавить категорию</span>
        </li>
      </ul>
      {hiddenPopup &&
      <div className="add__list-popup">
        <img src={imgClose} onClick={onClose} alt="Close" className="add__list-popup-close-btn"/>
        <TextField name="categoryName"
                   onChange={handleChange}
                   value={form.categoryName?.substring(0, 20)}
                   placeholder="Название категории"/>
        <div className="add__list-popup-colors">
          {colors.map(color => (
            <Badge selectedColor={selectedColor}
                   id={color.id}
                   onClick={() => setSelectedColor(color.id)}
                   key={color.hex}
                   color={color.hex}/>))}
        </div>
        <Button onClick={addList} name="Добавить" disabled={isLoading}/>
      </div>
      }
    </div>
  );
};

export default AddListForm;
