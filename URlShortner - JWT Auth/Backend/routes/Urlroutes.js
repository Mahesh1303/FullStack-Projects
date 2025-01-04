const express=require('express');


const{HandleGenerateShortURL,RedirectOrgURL,HandlegetAnalyticsCount,HandleGetAllUrl,HandleDeleteUrl}=require('../controllers/Urlcontroller');
const { VerifyCookie } = require('../middlewares/UserAuth');


const router=express.Router()


router.post('/',VerifyCookie,HandleGenerateShortURL)

router.get('/:id',RedirectOrgURL)

router.get('/analytics/:id',HandlegetAnalyticsCount)

router.get('/',VerifyCookie,HandleGetAllUrl)

router.delete('/:id',HandleDeleteUrl)


module.exports=router