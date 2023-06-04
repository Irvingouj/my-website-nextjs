import AddCircleIcon from '@mui/icons-material/AddCircle';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Chip, IconButton, Popover, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import Dropzone from 'react-dropzone';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FileUploadDialog({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [tags, setTags] = React.useState<string[]>([]);
  const reversedTags = [...tags].reverse();
  const handleUpload = () => {
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Upload Post</DialogTitle>
        <DialogContent>
          <Dropzone
            onDrop={(acceptedFiles) => {
              setFiles([...files, ...acceptedFiles]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section
                className="h-[200px] w-[400px] border-2 border-gray-300 border-dashed relative
                rounded-md flex flex-wrap hover:border-blue-400"
                {...getRootProps()}
              >
                {files.map((file, i) => (
                  <div
                    key={i}
                    className="overflow-hidden text-ellipsis w-16 h-[100px] m-3"
                  >
                    <div className="w-full h-[50%] flex justify-center items-center">
                      <InsertDriveFileIcon fontSize="large" />
                    </div>
                    <Typography variant="caption">{file.name}</Typography>
                  </div>
                ))}
                <div className="absolute opacity-50 -z-1 top-[80px] left-[140px] w-32">
                  <input {...getInputProps()} />
                  <p className={files.length > 0 ? 'hidden' : 'block'}>
                    upload your blog
                  </p>
                </div>
              </section>
            )}
          </Dropzone>

          <div className="flex justify-start align-text-bottom flex-wrap max-w-[400px] mt-5">
            {reversedTags.map((tag, index) => {
              return (
                <TagsWithPopover
                  value={tag}
                  setValue={(tagName) => {
                    const newTags = [...tags];
                    const reversedIndex = tags.length - index - 1;
                    newTags[reversedIndex] = tagName;
                    setTags(newTags);
                  }}
                  key={index}
                />
              );
            })}
            <IconButton
              onClick={() => {
                setTags([...tags, 'new tag']);
              }}
            >
              <AddCircleIcon color="primary" />
            </IconButton>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={handleUpload}>upload</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function TagsWithPopover({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Chip
        label={value}
        color="primary"
        clickable
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
        sx={{
          position: 'relative',
          m: '0.25rem',
          fontSize: '1rem',
          '@keyframes slidein': {
            from: {
              maxHeight: '0px',
              transform: 'scale(0)',
              opacity: 0,
            },
            to: {
              maxHeight: '100%',
              transform: 'scale(1)',
              opacity: 1,
            },
          },
          animation: 'slidein 0.5s ease-in-out',
        }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        sx={{
          borderRadius: '9999px',
        }}
      >
        <input
          type="text"
          placeholder={value}
          className="p-2 w-[100px] h-[40px] border-none placeholder-gray-300"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleClose();
            }
          }}
        />
      </Popover>
    </div>
  );
}
