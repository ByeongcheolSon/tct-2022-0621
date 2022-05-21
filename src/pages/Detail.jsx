import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL_DETAIL_PAGE = "http://localhost:3001/v1/chart/detail/";

function Detail() {

    const [detail, setDetail] = useState();

    const nv = useNavigate();
    const param = useParams();

    const fetchData = async () => {
        try {
            const { data } = await axios.get(SERVER_URL_DETAIL_PAGE + param.id)
            if(!data) return;
            setDetail(data.chart)
        }
        catch(err) {
            console.log(err);
        }

    }

    useEffect(() => {
        console.log('PARAM :::');
        console.log(param);
        fetchData();
    }, [])

    return (
        <div>
        {   detail &&
            (
                <>
                    <button onClick={() => { nv(`/`) }}>뒤로가기</button>
                    <div>{detail.title}</div>
                    <div>{detail.singer}</div>
                    <div>{detail.melodizer}</div>
                    <div>{detail.lyricist}</div>
                    <div>{detail.genre}</div>
                </>
            )
        }
        {
            !detail &&
            (
                <div>로딩 중....</div>
            )
        }
        </div>
    );
}

export default Detail;