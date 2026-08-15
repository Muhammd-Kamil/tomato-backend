import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again." })
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('ttttttttt', token_decode.id)
         req.body = req.body || {};
        req.body.userId = token_decode.id;
        console.log('uuuuuuuuuuuuuuuu', req.body.userId)
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error })
    }
}

export default authMiddleware;