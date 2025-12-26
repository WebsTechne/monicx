BEGIN;

-- ----------------------------
-- Data for public."Category"
-- ----------------------------
INSERT INTO
	public."Category" (
		id,
		name,
		slug,
		description,
		"imagePath",
		"createdAt"
	)
VALUES
	(
		35,
		'Men',
		'men',
		'Style that works anywhere — sharp fits, clean looks, and everyday comfort. From casual to classy, built for men who like their clothes simple, confident, and made to last.',
		'https://res.cloudinary.com/djvjpwys0/image/upload/v1760203073/monicx/categories/v73ptidweanbspmpmhta.jpg',
		'2025-10-12 10:12:19.89'
	),
	(
		36,
		'Women',
		'women',
		'Rooted in Nigerian style, made for real life. From Ankara and native wears to simple everyday fits, Monicx pieces keep it authentic, comfortable, and easy to wear anywhere — whether it''s campus, work, or a weekend event.',
		'https://res.cloudinary.com/djvjpwys0/image/upload/v1760203982/monicx/categories/m2fksrfkemp3vb7lzqsx.jpg',
		'2025-10-12 10:12:19.89'
	),
	(
		37,
		'Children',
		'children',
		'Bright, comfy, and made to keep up. From playful native styles to everyday outfits, Monicx kids'' wear brings Nigerian flair with room to run, jump, and just be kids.',
		'https://res.cloudinary.com/djvjpwys0/image/upload/v1760204496/monicx/categories/caii52itgssicfrlgfhv.jpg',
		'2025-10-12 10:12:19.89'
	),
	(
		38,
		'Ankara',
		'ankara',
		'Bold patterns, real culture. Monicx Ankara pieces celebrate Nigerian style with vibrant prints and clean tailoring — made for comfort, confidence, and standing out anywhere.',
		'https://res.cloudinary.com/djvjpwys0/image/upload/v1760205240/monicx/categories/d1tzaymnqcd8tnzwy12i.jpg',
		'2025-10-12 10:12:19.89'
	),
	(
		39,
		'Senator',
		'senator',
		'Classic Nigerian elegance, refined for today. Monicx Senator wears bring sharp cuts, quality fabric, and that effortless confidence fit for any occasion.',
		'https://res.cloudinary.com/djvjpwys0/image/upload/v1760205435/monicx/categories/ct1xebootla9bbp3svrj.jpg',
		'2025-10-12 10:12:19.89'
	),
	(
		40,
		'Ethnic ',
		'ethnic',
		'Proudly Nigerian, always stylish. From Ankara to Agbada, lace to Senator, Monicx Ethnic wear blends tradition with modern comfort — made for culture, confidence, and looking your best anywhere.',
		'https://res.cloudinary.com/djvjpwys0/image/upload/v1760205643/monicx/categories/ui4yjdebu78wh3kycoxg.jpg',
		'2025-10-12 10:12:19.89'
	),
	(
		41,
		'Corporate',
		'corporate',
		'Neat, confident, ready for business. Monicx Corporate wear keeps it smart and simple — shirts, trousers, and polished fits that look sharp from meetings to casual Fridays.',
		'https://res.cloudinary.com/djvjpwys0/image/upload/v1760206211/monicx/categories/sgqvnlodirnerc9aae6u.jpg',
		'2025-10-12 10:12:19.89'
	),
	(
		74,
		'Casual',
		'casual',
		'Relaxed fits with clean style. Monicx Casual wear keeps things easy — shirts, joggers, and outfits made for hanging out, running errands, or just staying cool without trying too hard.',
		'https://res.cloudinary.com/djvjpwys0/image/upload/v1760216585/monicx/categories/w4wtzciyxygln1o0gqd0.jpg',
		'2025-10-12 10:12:19.89'
	),
	(
		75,
		'Everyday',
		'everyday',
		'Simple, practical, and built for comfort. Monicx Everyday wear fits your routine — from lectures to outings — durable clothes you can actually live in.',
		'https://res.cloudinary.com/djvjpwys0/image/upload/v1760216750/monicx/categories/kjuutosv0xfiu5uxv4sq.jpg',
		'2025-10-12 10:12:19.89'
	),
	(
		76,
		'Uniforms',
		'uniforms',
		'Work-ready and well-fitted. From scrubs and lab coats to security, school, and hospitality uniforms, Monicx makes professional wear that''s clean, sturdy, and reliable.',
		'https://res.cloudinary.com/djvjpwys0/image/upload/v1760216916/monicx/categories/mljqvmjbgakywp4byfyv.jpg',
		'2025-10-12 10:12:19.89'
	),
	(
		77,
		'Caps',
		'caps',
		'Finishing touch, Nigerian style. Monicx caps — fila, senator caps, and other native designs — bring culture and class to any outfit.',
		'https://res.cloudinary.com/djvjpwys0/image/upload/v1760217047/monicx/categories/sszv2b7p97e4nhwutcvx.jpg',
		'2025-10-12 10:12:19.89'
	),
	(
		78,
		'Accessories',
		'accessories',
		'The details that complete the fit. Monicx crafts ties, bow ties, waistbands, mufflers, and pocket squares — all tailored to match your native or formal look.',
		'https://res.cloudinary.com/djvjpwys0/image/upload/v1760217599/monicx/categories/fl0aqry3a46c0j1tjwh7.jpg',
		'2025-10-12 10:12:19.89'
	);

-- make sure nextval continues from the highest id used above
SELECT
	pg_catalog.setval ('public."Category_id_seq"', 78, true);

-- ----------------------------
-- Data for public."Collection"
-- ----------------------------
INSERT INTO
	public."Collection" (
		id,
		name,
		description,
		"createdAt",
		"imagePath",
		slug
	)
VALUES
	(
		3,
		'Modern Native',
		'The balance between then and now. Modern Native is how you keep your cultural edge while staying contemporary. These are the outfits that fit in at a wedding, a rooftop event, or an evening flight. Tailored, proud, and quietly bold—this is tradition evolved.',
		'2025-10-12 09:55:52.589',
		'https://res.cloudinary.com/djvjpwys0/image/upload/v1760262935/monicx/collections/nelm4a72uggcyi820vow.jpg',
		'modern-native'
	);

SELECT
	pg_catalog.setval ('public."Collection_id_seq"', 3, true);

-- ----------------------------
-- Data for public."Color"
-- ----------------------------
INSERT INTO
	public."Color" (id, "hexCode", name, "groupName")
VALUES
	(1, '#3b82f6', 'blue', NULL),
	(2, '#10b981', 'green', NULL),
	(3, '#ef4444', 'red', NULL),
	(4, '#f59e0b', 'yellow', NULL),
	(5, '#8b5cf6', 'purple', NULL),
	(6, '#fb923c', 'orange', NULL),
	(7, '#ec4899', 'pink', NULL),
	(8, '#a16207', 'brown', NULL),
	(9, '#6b7280', 'gray', NULL),
	(10, '#000000', 'black', NULL),
	(11, '#ffffff', 'white', NULL);

SELECT
	pg_catalog.setval ('public."Color_id_seq"', 11, true);

-- ----------------------------
-- Data for public."Size"
-- ----------------------------
INSERT INTO
	public."Size" (id, gender, alpha, "chestCm", "waistCm")
VALUES
	(1, 'unisex', 'xs', NULL, NULL),
	(2, 'unisex', 's', NULL, NULL),
	(3, 'unisex', 'm', NULL, NULL),
	(4, 'unisex', 'l', NULL, NULL),
	(5, 'unisex', 'xl', NULL, NULL),
	(6, 'unisex', 'xxl', NULL, NULL),
	(7, 'unisex', '34', NULL, NULL),
	(8, 'unisex', '35', NULL, NULL),
	(9, 'unisex', '36', NULL, NULL),
	(10, 'unisex', '37', NULL, NULL),
	(11, 'unisex', '38', NULL, NULL),
	(12, 'unisex', '39', NULL, NULL),
	(13, 'unisex', '40', NULL, NULL),
	(14, 'unisex', '41', NULL, NULL),
	(15, 'unisex', '42', NULL, NULL),
	(16, 'unisex', '43', NULL, NULL),
	(17, 'unisex', '44', NULL, NULL),
	(18, 'unisex', '45', NULL, NULL),
	(19, 'unisex', '46', NULL, NULL),
	(20, 'unisex', '47', NULL, NULL),
	(21, 'unisex', '48', NULL, NULL);

SELECT
	pg_catalog.setval ('public."Size_id_seq"', 21, true);

COMMIT;