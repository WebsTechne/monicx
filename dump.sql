--
-- PostgreSQL database dump
--

\restrict GWGQm1SwAVUDBsTFaiT9kIm3Rp6Y9BLVnDM78mNPcm7g5nSjb3GecA4pQj0yHcK

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_clients (id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at, client_type) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag, oauth_client_id, refresh_token_hmac_key, refresh_token_counter, scopes) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid, last_webauthn_challenge_data) FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_authorizations (id, authorization_id, client_id, user_id, redirect_uri, scope, state, resource, code_challenge, code_challenge_method, response_type, status, authorization_code, created_at, expires_at, approved_at, nonce) FROM stdin;
\.


--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_client_states (id, provider_type, code_verifier, created_at) FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_consents (id, user_id, client_id, scopes, granted_at, revoked_at) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
20250804100000
20250901200500
20250903112500
20250904133000
20250925093508
20251007112900
20251104100000
20251111201300
20251201000000
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, name, slug, description, "imagePath", "createdAt") FROM stdin;
35	Men	men	Style that works anywhere — sharp fits, clean looks, and everyday comfort. From casual to classy, built for men who like their clothes simple, confident, and made to last.	https://res.cloudinary.com/djvjpwys0/image/upload/v1760203073/monicx/categories/v73ptidweanbspmpmhta.jpg	2025-10-12 10:12:19.89
36	Women	women	Rooted in Nigerian style, made for real life. From Ankara and native wears to simple everyday fits, Monicx pieces keep it authentic, comfortable, and easy to wear anywhere — whether it’s campus, work, or a weekend event.	https://res.cloudinary.com/djvjpwys0/image/upload/v1760203982/monicx/categories/m2fksrfkemp3vb7lzqsx.jpg	2025-10-12 10:12:19.89
37	Children	children	Bright, comfy, and made to keep up. From playful native styles to everyday outfits, Monicx kids’ wear brings Nigerian flair with room to run, jump, and just be kids.	https://res.cloudinary.com/djvjpwys0/image/upload/v1760204496/monicx/categories/caii52itgssicfrlgfhv.jpg	2025-10-12 10:12:19.89
38	Ankara	ankara	Bold patterns, real culture. Monicx Ankara pieces celebrate Nigerian style with vibrant prints and clean tailoring — made for comfort, confidence, and standing out anywhere.	https://res.cloudinary.com/djvjpwys0/image/upload/v1760205240/monicx/categories/d1tzaymnqcd8tnzwy12i.jpg	2025-10-12 10:12:19.89
39	Senator	senator	Classic Nigerian elegance, refined for today. Monicx Senator wears bring sharp cuts, quality fabric, and that effortless confidence fit for any occasion.	https://res.cloudinary.com/djvjpwys0/image/upload/v1760205435/monicx/categories/ct1xebootla9bbp3svrj.jpg	2025-10-12 10:12:19.89
40	Ethnic 	ethnic	Proudly Nigerian, always stylish. From Ankara to Agbada, lace to Senator, Monicx Ethnic wear blends tradition with modern comfort — made for culture, confidence, and looking your best anywhere.	https://res.cloudinary.com/djvjpwys0/image/upload/v1760205643/monicx/categories/ui4yjdebu78wh3kycoxg.jpg	2025-10-12 10:12:19.89
41	Corporate	corporate	Neat, confident, ready for business. Monicx Corporate wear keeps it smart and simple — shirts, trousers, and polished fits that look sharp from meetings to casual Fridays.	https://res.cloudinary.com/djvjpwys0/image/upload/v1760206211/monicx/categories/sgqvnlodirnerc9aae6u.jpg	2025-10-12 10:12:19.89
74	Casual	casual	Relaxed fits with clean style. Monicx Casual wear keeps things easy — shirts, joggers, and outfits made for hanging out, running errands, or just staying cool without trying too hard.	https://res.cloudinary.com/djvjpwys0/image/upload/v1760216585/monicx/categories/w4wtzciyxygln1o0gqd0.jpg	2025-10-12 10:12:19.89
75	Everyday	everyday	Simple, practical, and built for comfort. Monicx Everyday wear fits your routine — from lectures to outings — durable clothes you can actually live in.	https://res.cloudinary.com/djvjpwys0/image/upload/v1760216750/monicx/categories/kjuutosv0xfiu5uxv4sq.jpg	2025-10-12 10:12:19.89
76	Uniforms	uniforms	Work-ready and well-fitted. From scrubs and lab coats to security, school, and hospitality uniforms, Monicx makes professional wear that’s clean, sturdy, and reliable.	https://res.cloudinary.com/djvjpwys0/image/upload/v1760216916/monicx/categories/mljqvmjbgakywp4byfyv.jpg	2025-10-12 10:12:19.89
77	Caps	caps	Finishing touch, Nigerian style. Monicx caps — fila, senator caps, and other native designs — bring culture and class to any outfit.	https://res.cloudinary.com/djvjpwys0/image/upload/v1760217047/monicx/categories/sszv2b7p97e4nhwutcvx.jpg	2025-10-12 10:12:19.89
78	Accessories	accessories	The details that complete the fit. Monicx crafts ties, bow ties, waistbands, mufflers, and pocket squares — all tailored to match your native or formal look.	https://res.cloudinary.com/djvjpwys0/image/upload/v1760217599/monicx/categories/fl0aqry3a46c0j1tjwh7.jpg	2025-10-12 10:12:19.89
\.


--
-- Data for Name: Collection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Collection" (id, name, description, "createdAt", "imagePath", slug) FROM stdin;
3	Modern Native	The balance between then and now. Modern Native is how you keep your cultural edge while staying contemporary. These are the outfits that fit in at a wedding, a rooftop event, or an evening flight. Tailored, proud, and quietly bold—this is tradition evolved.	2025-10-12 09:55:52.589	https://res.cloudinary.com/djvjpwys0/image/upload/v1760262935/monicx/collections/nelm4a72uggcyi820vow.jpg	modern-native
\.


--
-- Data for Name: Color; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Color" (id, "hexCode", name, "groupName") FROM stdin;
1	#3b82f6	blue	\N
2	#10b981	green	\N
3	#ef4444	red	\N
4	#f59e0b	yellow	\N
5	#8b5cf6	purple	\N
6	#fb923c	orange	\N
7	#ec4899	pink	\N
8	#a16207	brown	\N
9	#6b7280	gray	\N
10	#000000	black	\N
11	#ffffff	white	\N
\.


--
-- Data for Name: Offer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Offer" (id, code, name, type, value, "minOrderAmt", "startAt", "endAt", active, "createdAt") FROM stdin;
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, sku, name, description, price, gender, "imagePath", stock, "weightKg", "dimensionsCm", status, "ratingAvg", "collectionId", "createdAt", "updatedAt", "shortDescription", slug) FROM stdin;
\.


--
-- Data for Name: ProductCategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductCategory" ("productId", "categoryId") FROM stdin;
\.


--
-- Data for Name: ProductColor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductColor" ("productId", "colorId") FROM stdin;
\.


--
-- Data for Name: Size; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Size" (id, gender, alpha, "chestCm", "waistCm") FROM stdin;
1	unisex	xs	\N	\N
2	unisex	s	\N	\N
3	unisex	m	\N	\N
4	unisex	l	\N	\N
5	unisex	xl	\N	\N
6	unisex	xxl	\N	\N
7	unisex	34	\N	\N
8	unisex	35	\N	\N
9	unisex	36	\N	\N
10	unisex	37	\N	\N
11	unisex	38	\N	\N
12	unisex	39	\N	\N
13	unisex	40	\N	\N
14	unisex	41	\N	\N
15	unisex	42	\N	\N
16	unisex	43	\N	\N
17	unisex	44	\N	\N
18	unisex	45	\N	\N
19	unisex	46	\N	\N
20	unisex	47	\N	\N
21	unisex	48	\N	\N
\.


--
-- Data for Name: ProductSizeStock; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductSizeStock" ("productId", "sizeId", qty) FROM stdin;
\.


--
-- Data for Name: Tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tag" (id, name) FROM stdin;
\.


--
-- Data for Name: ProductTag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductTag" ("productId", "tagId") FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-11-20 18:26:46
20211116045059	2025-11-20 18:26:48
20211116050929	2025-11-20 18:26:50
20211116051442	2025-11-20 18:26:52
20211116212300	2025-11-20 18:26:54
20211116213355	2025-11-20 18:26:56
20211116213934	2025-11-20 18:26:57
20211116214523	2025-11-20 18:27:00
20211122062447	2025-11-20 18:27:01
20211124070109	2025-11-20 18:27:03
20211202204204	2025-11-20 18:27:05
20211202204605	2025-11-20 18:27:06
20211210212804	2025-11-20 18:27:12
20211228014915	2025-11-20 18:27:14
20220107221237	2025-11-20 18:27:15
20220228202821	2025-11-20 18:27:17
20220312004840	2025-11-20 18:27:19
20220603231003	2025-11-20 18:27:21
20220603232444	2025-11-20 18:27:23
20220615214548	2025-11-20 18:27:25
20220712093339	2025-11-20 18:27:27
20220908172859	2025-11-20 18:27:29
20220916233421	2025-11-20 18:27:30
20230119133233	2025-11-20 18:27:32
20230128025114	2025-11-20 18:27:34
20230128025212	2025-11-20 18:27:36
20230227211149	2025-11-20 18:27:38
20230228184745	2025-11-20 18:27:39
20230308225145	2025-11-20 18:27:41
20230328144023	2025-11-20 18:27:43
20231018144023	2025-11-20 18:27:45
20231204144023	2025-11-20 18:27:47
20231204144024	2025-11-20 18:27:49
20231204144025	2025-11-20 18:27:51
20240108234812	2025-11-20 18:27:53
20240109165339	2025-11-20 18:27:54
20240227174441	2025-11-20 18:27:57
20240311171622	2025-11-20 18:28:00
20240321100241	2025-11-20 18:28:03
20240401105812	2025-11-20 18:28:08
20240418121054	2025-11-20 18:28:10
20240523004032	2025-11-20 18:28:16
20240618124746	2025-11-20 18:28:18
20240801235015	2025-11-20 18:28:20
20240805133720	2025-11-20 18:28:21
20240827160934	2025-11-20 18:28:23
20240919163303	2025-11-20 18:28:25
20240919163305	2025-11-20 18:28:27
20241019105805	2025-11-20 18:28:29
20241030150047	2025-11-20 18:28:35
20241108114728	2025-11-20 18:28:37
20241121104152	2025-11-20 18:28:39
20241130184212	2025-11-20 18:28:41
20241220035512	2025-11-20 18:28:43
20241220123912	2025-11-20 18:28:45
20241224161212	2025-11-20 18:28:46
20250107150512	2025-11-20 18:28:48
20250110162412	2025-11-20 18:28:50
20250123174212	2025-11-20 18:28:51
20250128220012	2025-11-20 18:28:53
20250506224012	2025-11-20 18:28:54
20250523164012	2025-11-20 18:28:56
20250714121412	2025-11-20 18:28:58
20250905041441	2025-11-20 18:28:59
20251103001201	2025-11-20 18:29:01
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_analytics (name, type, format, created_at, updated_at, id, deleted_at) FROM stdin;
\.


--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_vectors (id, type, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-11-20 18:26:43.651025
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-11-20 18:26:43.658914
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-11-20 18:26:43.664688
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-11-20 18:26:43.70654
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-11-20 18:26:43.78948
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-11-20 18:26:43.794136
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-11-20 18:26:43.800116
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-11-20 18:26:43.856588
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-11-20 18:26:44.193465
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-11-20 18:26:44.343833
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-11-20 18:26:44.356075
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-11-20 18:26:44.373688
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-11-20 18:26:44.419915
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-11-20 18:26:44.459598
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-11-20 18:26:44.519325
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-11-20 18:26:44.76652
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-11-20 18:26:44.970035
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-11-20 18:26:45.00738
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-11-20 18:26:45.085876
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-11-20 18:26:45.181756
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-11-20 18:26:45.380102
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-11-20 18:26:45.582859
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-11-20 18:26:45.701741
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-11-20 18:26:45.75542
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-11-20 18:26:45.767013
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-11-20 18:26:45.885556
26	objects-prefixes	ef3f7871121cdc47a65308e6702519e853422ae2	2025-11-20 18:26:46.081329
27	search-v2	33b8f2a7ae53105f028e13e9fcda9dc4f356b4a2	2025-11-20 18:26:46.148936
28	object-bucket-name-sorting	ba85ec41b62c6a30a3f136788227ee47f311c436	2025-11-20 18:26:47.174704
29	create-prefixes	a7b1a22c0dc3ab630e3055bfec7ce7d2045c5b7b	2025-11-20 18:26:47.183702
30	update-object-levels	6c6f6cc9430d570f26284a24cf7b210599032db7	2025-11-20 18:26:47.19695
31	objects-level-index	33f1fef7ec7fea08bb892222f4f0f5d79bab5eb8	2025-11-20 18:26:47.22341
32	backward-compatible-index-on-objects	2d51eeb437a96868b36fcdfb1ddefdf13bef1647	2025-11-20 18:26:47.230352
33	backward-compatible-index-on-prefixes	fe473390e1b8c407434c0e470655945b110507bf	2025-11-20 18:26:47.237442
34	optimize-search-function-v1	82b0e469a00e8ebce495e29bfa70a0797f7ebd2c	2025-11-20 18:26:47.244865
35	add-insert-trigger-prefixes	63bb9fd05deb3dc5e9fa66c83e82b152f0caf589	2025-11-20 18:26:47.251512
36	optimise-existing-functions	81cf92eb0c36612865a18016a38496c530443899	2025-11-20 18:26:47.257465
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2025-11-20 18:26:47.266623
38	iceberg-catalog-flag-on-buckets	19a8bd89d5dfa69af7f222a46c726b7c41e462c5	2025-11-20 18:26:47.272906
39	add-search-v2-sort-support	39cf7d1e6bf515f4b02e41237aba845a7b492853	2025-11-20 18:26:47.291213
40	fix-prefix-race-conditions-optimized	fd02297e1c67df25a9fc110bf8c8a9af7fb06d1f	2025-11-20 18:26:47.298241
41	add-object-level-update-trigger	44c22478bf01744b2129efc480cd2edc9a7d60e9	2025-11-20 18:26:47.313688
42	rollback-prefix-triggers	f2ab4f526ab7f979541082992593938c05ee4b47	2025-11-20 18:26:47.322335
43	fix-object-level	ab837ad8f1c7d00cc0b7310e989a23388ff29fc6	2025-11-20 18:26:47.328985
44	vector-bucket-type	99c20c0ffd52bb1ff1f32fb992f3b351e3ef8fb3	2025-11-20 18:26:47.335213
45	vector-buckets	049e27196d77a7cb76497a85afae669d8b230953	2025-11-20 18:26:47.340415
46	buckets-objects-grants	fedeb96d60fefd8e02ab3ded9fbde05632f84aed	2025-11-20 18:26:47.359049
47	iceberg-table-metadata	649df56855c24d8b36dd4cc1aeb8251aa9ad42c2	2025-11-20 18:26:47.367825
48	iceberg-catalog-ids	2666dff93346e5d04e0a878416be1d5fec345d6f	2025-11-20 18:26:47.372266
49	buckets-objects-grants-postgres	072b1195d0d5a2f888af6b2302a1938dd94b8b3d	2025-12-23 18:39:06.013479
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata, level) FROM stdin;
\.


--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.prefixes (bucket_id, name, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.vector_indexes (id, name, bucket_id, data_type, dimension, distance_metric, metadata_configuration, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Category_id_seq"', 78, true);


--
-- Name: Collection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Collection_id_seq"', 3, true);


--
-- Name: Color_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Color_id_seq"', 11, true);


--
-- Name: Offer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Offer_id_seq"', 1, false);


--
-- Name: Size_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Size_id_seq"', 21, true);


--
-- Name: Tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Tag_id_seq"', 1, false);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

\unrestrict GWGQm1SwAVUDBsTFaiT9kIm3Rp6Y9BLVnDM78mNPcm7g5nSjb3GecA4pQj0yHcK

