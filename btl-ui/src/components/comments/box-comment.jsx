
import { getToken, getUser } from '../../api/axios-client';
import { iconSend03Filled } from '../../assets';
import { ButtonIcon } from '../button/button-icon';
import postAPI from '../../api/post-api';
import { ButtonAvatar } from '../button/button-avatar';

import '../../styles/comment/write-comment.css';

const BoxComment = (props) => {
    const { placeholder, postId, form, name } = props;
    const tokenName = getToken()
    const user = getUser();
    // console.log(postId);

    const handleSendComment = () => {
        postAPI.addComment(tokenName, postId, {text: form.getValues(name)})

        // console.log(form.getValues(name));
        form.reset();
    }

    return (
        <div className='message' >
            <div className='message__avatar'>
                <ButtonAvatar
                    alt=''
                    type='image'
                    size={40}
                    src={user.avatar}
                />
            </div>
            <form className='message__box' onSubmit={form.handleSubmit(handleSendComment)}>
                {/* <fieldset> */}
                <textarea className='form-control message__box-input txt-body-14-regular' {...form.register(name)} type='text' placeholder={placeholder} onInput={(e) => { e.target.style.height = ''; e.target.style.height = e.target.scrollHeight + 'px' }} />
                <div className='d-flex wrapper__icon'>
                    <ButtonIcon
                        size={'medium'}
                        icon={iconSend03Filled}
                        variant={'ghost'}
                    />
                </div>
                {/* </fieldset> */}
            </form>
        </div>
    )
}

export default BoxComment;