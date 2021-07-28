import styled from 'styled-components';

const Form = styled.form`
    display : flex;
    margin-bottom : 16px;
`;

const Input = styled.input`
    width : 100%;
    height : 50px;
    padding : 16px 0 16px 16px;
    border : 1px solid rgba(186, 190, 204, 0.5);
    background-color : #f2f3f7;
    border-radius : 10px;
    outline : none;
    font-family : GmarketSansLight;
    font-size : 16px;

    ::placeholder-shwon {
        text-overflow: ellipsis;
    }
`;

const SetTodoNull = () => {
    return (
        <>
            <Form onSubmit={e => e.preventDefault()}>
                <Input type="text" placeholder="드래그 해서 순서를 변경하세요" readOnly />
            </Form>
        </>
    )
}

export default SetTodoNull;