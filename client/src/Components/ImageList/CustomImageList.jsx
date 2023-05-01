import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
// import StarBorderIcon from '@mui/icons-material/StarBorder';
import { FaStar } from 'react-icons/fa';

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function CustomImageList() {
  return (
    <ImageList
      sx={{
        width: '70%',
        height: 650,
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: 'translateZ(0)',
      }}
      rowHeight={200}
      gap={1}
    >
      {itemData.map((item) => {
        const cols = item.featured ? 2 : 1;
        const rows = item.featured ? 2 : 1;

        return (
          <ImageListItem key={item.img} cols={cols} rows={rows}>
            <img
              {...srcset(item.img, 250, 200, rows, cols)}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title={item.title}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`star ${item.title}`}
                >
                  <FaStar />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://imgmedia.lbb.in/media/2022/12/63aaa318e9c4cc0f83cc8598_1672127256471.jpg',
    title: 'Nursery',
    author: '@bkristastucchio',
    featured: true,
  },
  {
    img: 'https://bute-park.com/wp-content/uploads/ChayGardens-18.jpg',
    title: 'Nursery',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://media.istockphoto.com/id/1125570422/photo/florists-women-working-with-flowers-in-a-greenhouse.jpg?s=612x612&w=0&k=20&c=74NBqdnSF1Z5zS8hKjkI9xE6dnnrvdARjy1rcxqnjj8=',
    title: 'Nursery',
    author: '@helloimnik',
  },
  {
    img: 'https://bute-park.com/wp-content/uploads/ChayGardens-18.jpg',
    title: 'Nursery',
    author: '@nolanissac',
  },
  {
    img: 'https://t4.ftcdn.net/jpg/03/35/91/53/360_F_335915319_m5RPlCsyNFe24hDInTBQvrgzCYpXdYMG.jpg',
    title: 'Nursery',
    author: '@hjrc33',
  },
  {
    img: 'https://bute-park.com/wp-content/uploads/ChayGardens-18.jpg',
    title: 'Nursery',
    author: '@arwinneil',
    featured: true,
  },
  {
    img: 'https://bute-park.com/wp-content/uploads/ChayGardens-18.jpg',
    title: 'Nursery',
    author: '@tjdragotta',
  },
  {
    img: 'https://bute-park.com/wp-content/uploads/ChayGardens-18.jpg',
    title: 'Nursery',
    author: '@katie_wasserman',
  },
  {
    img: 'https://bute-park.com/wp-content/uploads/ChayGardens-18.jpg',
    title: 'Nursery',
    author: '@silverdalex',
  },
  {
    img: 'https://bute-park.com/wp-content/uploads/ChayGardens-18.jpg',
    title: 'Nursery',
    author: '@shelleypauls',
  },
  {
    img: 'https://bute-park.com/wp-content/uploads/ChayGardens-18.jpg',
    title: 'Nursery',
    author: '@peterlaster',
  },
  {
    img: 'https://bute-park.com/wp-content/uploads/ChayGardens-18.jpg',
    title: 'Nursery',
    author: '@southside_customs',
  },
];
