import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import FilmInfo from './FilmInfo';
import { Link } from 'react-router-dom';
import { useTheme } from "@emotion/react";
import FilmDetailTime from './FilmDetailTime';
import { Typography } from '@mui/material';
import User_item from '../../../public/user_1.png'
import Star from '../../../public/star.png'
import './comment.css'
import { useLocation } from 'react-router-dom';

function createSlug(name) {
  
  return name
    .trim()
    .replace(/\s*:\s*/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function FilmDetail() {
  const { film_name } = useParams();
  const [selectedArea, setSelectedArea] = useState(null);
  const [data, setData] = useState(null);
  const [dataComment, setDataComment] = useState(null);
  const theme = useTheme();
  const film_id = localStorage.getItem('film_id');

  const handleAreaChange = (newArea) => {
    setSelectedArea(newArea);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/film/filmInfo/getComment/id=${film_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          setDataComment(result);
          console.log(result);
        } else {
          console.error('Lỗi khi truy cập:', response.statusText);
        }
      } catch (error) {
        console.error('Lỗi mạng:', error);
      }
    };

    if (film_id) {
      fetchData();
    }
  }, [film_id]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/film/filmInfo/id=${film_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setData(result);
          } else {
            console.log(`Truy cập: ${result.message}`);
          }
        } else {
          console.error('Lỗi khi truy cập:', response.statusText);
        }
      } catch (error) {
        console.error('Lỗi mạng:', error);
      }
    };

    if (film_id) {
      fetchData();
    }
  }, [film_id]);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await fetch(`/api/film/filmInfo/id=${film_id}/lichChieu/khuVuc_id=${selectedArea?.region_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result);
        } else {
          console.error('Lỗi khi truy cập:', response.statusText);
        }
      } catch (error) {
        console.error('Lỗi mạng:', error);
      }
    };

    if (film_id && selectedArea) {
      fetchCinemas();
    }
  }, [film_id, selectedArea]);

  return (
    <>
      {data && (() => {
        const item = data.info.film[0];
        const exactlyDate = item.Release_date.substring(8, 10) + '/' + item.Release_date.substring(5, 7) + '/' + item.Release_date.substring(0, 4);

        return (
          <>
            <FilmInfo
              image={item.film_img}
              name={item.film_name}
              type={data.info.categorys[0].category_name}
              descript={item.film_describe}
              evalute="1"
              release={exactlyDate}
              time={item.duration}
              age={item.age_limit}
              actors={data.info.actors}
              directors={data.info.directors}
            />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '7%', paddingTop: "15px", fontSize: '16px' }}>
              <Link to={`/phim/${encodeURIComponent(createSlug(data.info.film[0].film_name))}`} style={{ textDecoration: 'none', cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>Thông tin</Link>
              <Link to={`/lich_chieu/${encodeURIComponent(createSlug(data.info.film[0].film_name))}`} style={{ textDecoration: 'none', cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>Lịch chiếu</Link>
              <Link to={`/danh_gia/${encodeURIComponent(createSlug(data.info.film[0].film_name))}`} style={{ textDecoration: 'none', cursor: 'pointer', color: theme.palette.mode === 'dark' ? '#c7c1c1' : '#8a8888' }}>Đánh giá</Link>
              <Link to={`/mua_ve/${encodeURIComponent(createSlug(data.info.film[0].film_name))}`} style={{ textDecoration: 'none', cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>Mua vé</Link>
            </div>
            <hr style={{ width: "42%", marginLeft: '29%' }} />
            <div className='cmt-container'>
              <div className='film-rate'>
                  <div style={{width:'30%'}}>
                      <p style={{fontSize:'48px', color:'#00d97e'}}>4.8<span style={{fontSize:'20px', color:'#00d97e'}}>/5</span></p>
                  </div>
                  <hr />
                  <div style={{width:'70%',display:'flex',flexDirection:'column'}}>
                      <p style={{fontSize:'13px',margin:'8px',color:'#4e4e4e'}}><span style={{fontSize:'13px', color:'#484848',fontWeight:'bold'}}>{data.info.film[0].film_name}</span> nhận được <span style={{fontSize:'14px', color:'#484848',fontWeight:'bold'}}>{dataComment.numberOfComment}</span> lượt đánh giá được xác thực với số điểm trung bình rate/5</p>
                      <p style={{fontSize:'13px',margin:'0px 8px 8px 8px',color:'#4e4e4e'}}>Đa số người xem đánh giá tích cực về bộ phim. Chỉ <span style={{fontSize:'13px', color:'#484848',fontWeight:'bold'}}>8%</span> nhận xét phim không hay.</p>
                  </div>
              </div>
              <hr className='line' />
              {dataComment.comment.map(comments => (
                <div className='list-cmt'>
                  <img src={User_item} className='icon-rate' />
                  <div className='cmt-content'>
                    <h1>{comments.full_name}</h1>
                    <p>
                      {[...Array(comments.star)].map(() => (
                        <img src={Star} className='span-icon-rate' />
                      ))}
                    </p>
                    <h3>{comments.comments ? comments.comments : 'Đánh giá không được viết bởi người mua'}</h3>
                    <h5>{comments.date_posted.split("T")[0]}</h5>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      })()}
    </>
  );
}
