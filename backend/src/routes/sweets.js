import express from 'express';
import { addSweet, getSweets, searchSweets, updateSweet, deleteSweet,purchaseSweet, restockSweet } from '../controllers/sweetsController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
import wrapAsync from '../utils/wrapAsync.js';

const router = express.Router();

router.get('/', protect, wrapAsync(getSweets));
router.post('/', protect, wrapAsync(addSweet));
router.get('/search', protect, wrapAsync(searchSweets));
router.put('/:id', protect, wrapAsync(updateSweet));
router.delete('/:id', protect, admin, wrapAsync(deleteSweet));

router.post('/:id/purchase', protect, wrapAsync(purchaseSweet));
router.post('/:id/restock', protect, admin, wrapAsync(restockSweet));

export default router;