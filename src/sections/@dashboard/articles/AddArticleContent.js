import * as React from 'react';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Grid, Card, Stack, InputAdornment, IconButton, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { useLocation } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// components
import { useSettingsContext } from '../../../components/settings';
import FormProvider, {
    RHFTextField,
} from '../../../components/hook-form';
import Iconify from '../../../components/iconify';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { postArticle, updateArticle, clearArticle, postArticlesAPI, getArticlesAPI, putArtilcesAPI } from '../../../redux/slices/articles';

// ----------------------------------------------------------------------
export default function AddUserContent() {
    const { themeStretch } = useSettingsContext();
    const dispatch = useDispatch();
    const location = useLocation();
    const { article, articlesList, currentArticleID, alertMessage } = useSelector((state) => state.article);
    useEffect(() => {
        if (location.pathname.includes("add")) {
            dispatch(clearArticle({
                url: "",
                category: "",
                name: "",
                codeLoc: "",
                appCode: "",
                popup: "",
                bootstrap: "",
                catSeq: "",
                pageSeq: "",
                newModal: "",
            }));
        }
    }, [location.pathname]);
    useEffect(() => {
        if (article && Object.keys(article)?.length > 0) {
            setValue("url", article.url);
            setValue("category", article.category);
            setValue("name", article.name);
            setValue("codeLoc", article.codeLoc);
            setValue("appCode", article.appCode);
            setValue("popup", article.popup);
            setValue("bootstrap", article.bootstrap);
            setValue("catSeq", article.catSeq);
            setValue("pageSeq", article.pageSeq);
            setValue("newModal", article.newModal);
        }
    }, [article]);
    useEffect(() => {
        dispatch(getArticlesAPI());
    }, []);
    const ArticleFormSchema = Yup.object().shape({
        url: Yup.string(),
        category: Yup.string(),
        name: Yup.string(),
        codeLoc: Yup.string(),
        appCode: Yup.string(),
        popup: Yup.string(),
        bootstrap: Yup.string(),
        catSeq: Yup.string(),
        pageSeq: Yup.string(),
        newModal: Yup.string(),
    });

    const defaultValues = {
        category: "",
        name: "",
        codeLoc: "",
        appCode: "",
        popup: "",
        bootstrap: "",
        catSeq: "",
        pageSeq: "",
        newModal: "",
        url: "",
    };
    const methods = useForm({
        resolver: yupResolver(ArticleFormSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;

    const values = watch();
    const onSubmit = async (data) => {
        try {
            if (currentArticleID) {
                const index = articlesList?.findIndex((col) => col.id === currentArticleID);
                const currentObj = { ...articlesList[index] };
                currentObj.url = data.url;
                currentObj.category = data.category;
                currentObj.name = data.name;
                currentObj.codeLoc = data.codeLoc;
                currentObj.appCode = data.appCode;
                currentObj.popup = data.popup;
                currentObj.bootstrap = data.bootstrap;
                currentObj.catSeq = data.catSeq;
                currentObj.pageSeq = data.pageSeq;
                currentObj.newModal = data.newModal;
                console.log(currentObj);
                dispatch(updateArticle(currentObj));
                dispatch(putArtilcesAPI(currentArticleID, currentObj));
                const newState = {
                    vertical: 'top',
                    horizontal: 'center',
                };
                setState({ open: true, ...newState });
                setTimeout(() => {
                    dispatch(getArticlesAPI());
                }, 3000);

            } else {
                dispatch(postArticle({
                    url: data.url,
                    category: data.category,
                    name: data.name,
                    codeLoc: data.codeLoc,
                    appCode: data.appCode,
                    popup: data.popup,
                    bootstrap: data.bootstrap,
                    catSeq: data.catSeq,
                    pageSeq: data.pageSeq,
                    newModal: data.newModal,
                }));
                dispatch(postArticlesAPI({
                    url: data.url,
                    category: data.category,
                    name: data.name,
                    codeLoc: data.codeLoc,
                    appCode: data.appCode,
                    popup: data.popup,
                    bootstrap: data.bootstrap,
                    catSeq: data.catSeq,
                    pageSeq: data.pageSeq,
                    newModal: data.newModal,
                }));
                const newState = {
                    vertical: 'top',
                    horizontal: 'center',
                };
                setState({ open: true, ...newState });
                setTimeout(() => {
                    dispatch(getArticlesAPI());
                }, 3000);
            }
            reset();
        } catch (error) {
            console.error(error);
        }
    };
    // snackbar
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setState({ ...state, open: false });
    };

    const action = (
        <>
            {/* <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button> */}
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <Iconify icon="eva:close-fill" />
            </IconButton>
        </>
    );
    useEffect(() => {
        if (alertMessage) {
            // const newState = {
            //     vertical: 'top',
            //     horizontal: 'center',
            // };
            // setState({ open: true, ...newState });
        }
    }, [alertMessage]);
    return (
        <>
            <Helmet>
                <title> Add User Content | Shapiro 360</title>
            </Helmet>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Card sx={{ p: 2 }}>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> URL </Typography>
                        <RHFTextField name="url" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }}
                        />
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> Category </Typography>
                        <RHFTextField name="category" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }}
                        />
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> Name </Typography>
                        <RHFTextField name="name" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }}
                        />
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> Code Loc </Typography>
                        <RHFTextField name="codeLoc" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }}
                        />
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> App Code </Typography>
                        <RHFTextField name="appCode" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }}
                        />
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> Popup </Typography>
                        <RHFTextField name="popup" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }}
                        />
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> Bootstrap </Typography>
                        <RHFTextField name="bootstrap" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }}
                        />
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> Cat Seq </Typography>
                        <RHFTextField name="catSeq" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }}
                        />
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> Page Seq </Typography>
                        <RHFTextField name="pageSeq" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }}
                        />
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> New Modal </Typography>
                        <RHFTextField name="newModal" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }}
                        />
                    </Stack>


                    <Stack flexDirection={"row"} alignItems={"center"} justifyContent="flex-end" sx={{ mt: 2, mr: "16%" }}>
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                            Save
                        </LoadingButton>
                    </Stack>
                </Card>
            </FormProvider>
            <Snackbar anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                key={vertical + horizontal}
                // message={alertMessage}
                message={(location.pathname.includes("edit")) ? "Article Updated" : "Article Created"}
                autoHideDuration={3500}
                action={action}
            />
        </>
    );
}
