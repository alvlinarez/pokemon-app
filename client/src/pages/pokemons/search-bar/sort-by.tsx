import { Fab, FormControl, FormControlLabel, Menu, MenuItem, MenuList, Radio, RadioGroup, Typography } from '@mui/material';
import { Img } from '../../../components';
import tagImg from '../../../assets/tag.svg';
import textFormatImg from '../../../assets/text_format.svg';
import { colors } from '../../../util';
import { usePokemonSearch } from '../../../context';
import { useState, type MouseEvent, type ChangeEvent } from 'react';
import type { SortBy } from '../../../types';

export function SortBy() {
  const { sortBy, updateSortBy } = usePokemonSearch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClick = (event: ChangeEvent<HTMLInputElement>) => {
    updateSortBy(event.target.value as SortBy);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Fab
        id="sort-fab"
        sx={{ borderRadius: '50%', padding: '8px', width: 48, height: 48, background: colors.white }}
        onClick={handleClick}
        aria-controls={open ? 'sort-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {sortBy === 'number' ? <Img src={tagImg} alt="TagImg" /> : <Img src={textFormatImg} alt="TagImg" />}
      </Fab>

      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              background: colors.primary,
              color: colors.white,
              padding: 1,
              // top: '120px!important', left: '280px!important'
            },
          },
          list: {
            'aria-labelledby': 'sort-fab',
          },
        }}
      >
        <MenuItem sx={{ padding: 0 }}>
          <Typography fontWeight={700} fontStyle={'bold'} lineHeight={'16px'}>
            Sort by:
          </Typography>
        </MenuItem>

        <MenuList sx={{ backgroundColor: colors.white, color: colors.dark, borderRadius: 2 }}>
          <MenuItem onClick={handleClose}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={sortBy}
                onChange={handleSortClick}
              >
                <FormControlLabel
                  value="number"
                  control={
                    <Radio
                      sx={{
                        color: colors.primary,
                        '&.Mui-checked': {
                          color: colors.primary,
                        },
                      }}
                    />
                  }
                  label="Number"
                />
                <FormControlLabel
                  value="name"
                  control={
                    <Radio
                      sx={{
                        color: colors.primary,
                        '&.Mui-checked': {
                          color: colors.primary,
                        },
                      }}
                    />
                  }
                  label="Name"
                />
              </RadioGroup>
            </FormControl>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
