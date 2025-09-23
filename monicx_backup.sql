--
-- PostgreSQL database dump
--

\restrict JHwSgfGQ68UwwxSWVgEXbZ3CMnmbQKHXjomduey8ttvfSnMno7JXMBaChJea8mS

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
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: Gender; Type: TYPE; Schema: public; Owner: monicx_admin
--

CREATE TYPE public."Gender" AS ENUM (
    'male',
    'female',
    'unisex'
);


ALTER TYPE public."Gender" OWNER TO monicx_admin;

--
-- Name: OfferType; Type: TYPE; Schema: public; Owner: monicx_admin
--

CREATE TYPE public."OfferType" AS ENUM (
    'percentage',
    'fixed',
    'bogo'
);


ALTER TYPE public."OfferType" OWNER TO monicx_admin;

--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: monicx_admin
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'pending',
    'paid',
    'shipped',
    'completed',
    'canceled'
);


ALTER TYPE public."OrderStatus" OWNER TO monicx_admin;

--
-- Name: ProductStatus; Type: TYPE; Schema: public; Owner: monicx_admin
--

CREATE TYPE public."ProductStatus" AS ENUM (
    'draft',
    'active',
    'archived'
);


ALTER TYPE public."ProductStatus" OWNER TO monicx_admin;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: monicx_admin
--

CREATE TYPE public."Role" AS ENUM (
    'customer',
    'admin',
    'vendor'
);


ALTER TYPE public."Role" OWNER TO monicx_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Address; Type: TABLE; Schema: public; Owner: monicx_admin
--

CREATE TABLE public."Address" (
    id integer NOT NULL,
    "userId" uuid NOT NULL,
    label character varying(50),
    street character varying(255),
    city character varying(100),
    state character varying(100),
    country character varying(100),
    zip character varying(20)
);


ALTER TABLE public."Address" OWNER TO monicx_admin;

--
-- Name: Address_id_seq; Type: SEQUENCE; Schema: public; Owner: monicx_admin
--

CREATE SEQUENCE public."Address_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Address_id_seq" OWNER TO monicx_admin;

--
-- Name: Address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: monicx_admin
--

ALTER SEQUENCE public."Address_id_seq" OWNED BY public."Address".id;


--
-- Name: Category; Type: TABLE; Schema: public; Owner: monicx_admin
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    slug character varying(100) NOT NULL,
    description text
);


ALTER TABLE public."Category" OWNER TO monicx_admin;

--
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: monicx_admin
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Category_id_seq" OWNER TO monicx_admin;

--
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: monicx_admin
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- Name: Collection; Type: TABLE; Schema: public; Owner: monicx_admin
--

CREATE TABLE public."Collection" (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Collection" OWNER TO monicx_admin;

--
-- Name: Collection_id_seq; Type: SEQUENCE; Schema: public; Owner: monicx_admin
--

CREATE SEQUENCE public."Collection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Collection_id_seq" OWNER TO monicx_admin;

--
-- Name: Collection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: monicx_admin
--

ALTER SEQUENCE public."Collection_id_seq" OWNED BY public."Collection".id;


--
-- Name: Color; Type: TABLE; Schema: public; Owner: monicx_admin
--

CREATE TABLE public."Color" (
    id integer NOT NULL,
    "hexCode" character(7) NOT NULL,
    name character varying(50) NOT NULL,
    "groupName" character varying(50)
);


ALTER TABLE public."Color" OWNER TO monicx_admin;

--
-- Name: Color_id_seq; Type: SEQUENCE; Schema: public; Owner: monicx_admin
--

CREATE SEQUENCE public."Color_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Color_id_seq" OWNER TO monicx_admin;

--
-- Name: Color_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: monicx_admin
--

ALTER SEQUENCE public."Color_id_seq" OWNED BY public."Color".id;


--
-- Name: Offer; Type: TABLE; Schema: public; Owner: monicx_admin
--

CREATE TABLE public."Offer" (
    id integer NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    type public."OfferType" DEFAULT 'percentage'::public."OfferType" NOT NULL,
    value numeric(10,2) NOT NULL,
    "minOrderAmt" numeric(10,2),
    "startAt" timestamp(3) without time zone NOT NULL,
    "endAt" timestamp(3) without time zone NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Offer" OWNER TO monicx_admin;

--
-- Name: Offer_id_seq; Type: SEQUENCE; Schema: public; Owner: monicx_admin
--

CREATE SEQUENCE public."Offer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Offer_id_seq" OWNER TO monicx_admin;

--
-- Name: Offer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: monicx_admin
--

ALTER SEQUENCE public."Offer_id_seq" OWNED BY public."Offer".id;


--
-- Name: Order; Type: TABLE; Schema: public; Owner: monicx_admin
--

CREATE TABLE public."Order" (
    id integer NOT NULL,
    "userId" uuid NOT NULL,
    "totalAmt" numeric(10,2) NOT NULL,
    status public."OrderStatus" DEFAULT 'pending'::public."OrderStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Order" OWNER TO monicx_admin;

--
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: monicx_admin
--

CREATE TABLE public."OrderItem" (
    "orderId" integer NOT NULL,
    "productId" uuid NOT NULL,
    qty integer NOT NULL,
    "unitPrice" numeric(10,2) NOT NULL
);


ALTER TABLE public."OrderItem" OWNER TO monicx_admin;

--
-- Name: OrderOffer; Type: TABLE; Schema: public; Owner: monicx_admin
--

CREATE TABLE public."OrderOffer" (
    "orderId" integer NOT NULL,
    "offerId" integer NOT NULL,
    amount numeric(10,2) NOT NULL
);


ALTER TABLE public."OrderOffer" OWNER TO monicx_admin;

--
-- Name: Order_id_seq; Type: SEQUENCE; Schema: public; Owner: monicx_admin
--

CREATE SEQUENCE public."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Order_id_seq" OWNER TO monicx_admin;

--
-- Name: Order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: monicx_admin
--

ALTER SEQUENCE public."Order_id_seq" OWNED BY public."Order".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: monicx_admin
--

CREATE TABLE public."Product" (
    id uuid NOT NULL,
    sku character varying(50) NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    gender public."Gender" DEFAULT 'unisex'::public."Gender" NOT NULL,
    "imagePath" character varying(255),
    stock integer DEFAULT 0 NOT NULL,
    "weightKg" numeric(6,3),
    "dimensionsCm" character varying(50),
    status public."ProductStatus" DEFAULT 'active'::public."ProductStatus" NOT NULL,
    "ratingAvg" numeric(3,2) DEFAULT 0 NOT NULL,
    "collectionId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Product" OWNER TO monicx_admin;

--
-- Name: ProductCategory; Type: TABLE; Schema: public; Owner: monicx_admin
--

CREATE TABLE public."ProductCategory" (
    "productId" uuid NOT NULL,
    "categoryId" integer NOT NULL
);


ALTER TABLE public."ProductCategory" OWNER TO monicx_admin;

--
-- Name: ProductColor; Type: TABLE; Schema: public; Owner: monicx_admin
--

CREATE TABLE public."ProductColor" (
    "productId" uuid NOT NULL,
    "colorId" integer NOT NULL
);


ALTER TABLE public."ProductColor" OWNER TO monicx_admin;

--
-- Name: ProductSizeStock; Type: TABLE; Schema: public; Owner: monicx_admin
--

CREATE TABLE public."ProductSizeStock" (
    "productId" uuid NOT NULL,
    "sizeId" integer NOT NULL,
    qty integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."ProductSizeStock" OWNER TO monicx_admin;

--
-- Name: ProductTag; Type: TABLE; Schema: public; Owner: monicx_admin
--

CREATE TABLE public."ProductTag" (
    "productId" uuid NOT NULL,
    "tagId" integer NOT NULL
);


ALTER TABLE public."ProductTag" OWNER TO monicx_admin;

--
-- Name: Size; Type: TABLE; Schema: public; Owner: monicx_admin
--

CREATE TABLE public."Size" (
    id integer NOT NULL,
    gender public."Gender" NOT NULL,
    alpha character varying(10) NOT NULL,
    "chestCm" numeric(5,2),
    "waistCm" numeric(5,2)
);


ALTER TABLE public."Size" OWNER TO monicx_admin;

--
-- Name: Size_id_seq; Type: SEQUENCE; Schema: public; Owner: monicx_admin
--

CREATE SEQUENCE public."Size_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Size_id_seq" OWNER TO monicx_admin;

--
-- Name: Size_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: monicx_admin
--

ALTER SEQUENCE public."Size_id_seq" OWNED BY public."Size".id;


--
-- Name: Tag; Type: TABLE; Schema: public; Owner: monicx_admin
--

CREATE TABLE public."Tag" (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public."Tag" OWNER TO monicx_admin;

--
-- Name: Tag_id_seq; Type: SEQUENCE; Schema: public; Owner: monicx_admin
--

CREATE SEQUENCE public."Tag_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Tag_id_seq" OWNER TO monicx_admin;

--
-- Name: Tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: monicx_admin
--

ALTER SEQUENCE public."Tag_id_seq" OWNED BY public."Tag".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: monicx_admin
--

CREATE TABLE public."User" (
    id uuid NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "firstName" character varying(50),
    "lastName" character varying(50),
    role public."Role" DEFAULT 'customer'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO monicx_admin;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: monicx_admin
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO monicx_admin;

--
-- Name: Address id; Type: DEFAULT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Address" ALTER COLUMN id SET DEFAULT nextval('public."Address_id_seq"'::regclass);


--
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- Name: Collection id; Type: DEFAULT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Collection" ALTER COLUMN id SET DEFAULT nextval('public."Collection_id_seq"'::regclass);


--
-- Name: Color id; Type: DEFAULT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Color" ALTER COLUMN id SET DEFAULT nextval('public."Color_id_seq"'::regclass);


--
-- Name: Offer id; Type: DEFAULT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Offer" ALTER COLUMN id SET DEFAULT nextval('public."Offer_id_seq"'::regclass);


--
-- Name: Order id; Type: DEFAULT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Order" ALTER COLUMN id SET DEFAULT nextval('public."Order_id_seq"'::regclass);


--
-- Name: Size id; Type: DEFAULT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Size" ALTER COLUMN id SET DEFAULT nextval('public."Size_id_seq"'::regclass);


--
-- Name: Tag id; Type: DEFAULT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Tag" ALTER COLUMN id SET DEFAULT nextval('public."Tag_id_seq"'::regclass);


--
-- Data for Name: Address; Type: TABLE DATA; Schema: public; Owner: monicx_admin
--

COPY public."Address" (id, "userId", label, street, city, state, country, zip) FROM stdin;
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: monicx_admin
--

COPY public."Category" (id, name, slug, description) FROM stdin;
1	Tops	tops	Shirts, blouses and tees
\.


--
-- Data for Name: Collection; Type: TABLE DATA; Schema: public; Owner: monicx_admin
--

COPY public."Collection" (id, name, description, "createdAt") FROM stdin;
1	Summer 2025	Seasonal collection	2025-09-14 23:35:12.242
2	Basics	Everyday essentials	2025-09-14 23:35:12.242
3	Summer 2025	Seasonal collection	2025-09-21 13:34:28.995
4	Basics	Everyday essentials	2025-09-21 13:34:28.995
\.


--
-- Data for Name: Color; Type: TABLE DATA; Schema: public; Owner: monicx_admin
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
-- Data for Name: Offer; Type: TABLE DATA; Schema: public; Owner: monicx_admin
--

COPY public."Offer" (id, code, name, type, value, "minOrderAmt", "startAt", "endAt", active, "createdAt") FROM stdin;
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: monicx_admin
--

COPY public."Order" (id, "userId", "totalAmt", status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: monicx_admin
--

COPY public."OrderItem" ("orderId", "productId", qty, "unitPrice") FROM stdin;
\.


--
-- Data for Name: OrderOffer; Type: TABLE DATA; Schema: public; Owner: monicx_admin
--

COPY public."OrderOffer" ("orderId", "offerId", amount) FROM stdin;
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: monicx_admin
--

COPY public."Product" (id, sku, name, description, price, gender, "imagePath", stock, "weightKg", "dimensionsCm", status, "ratingAvg", "collectionId", "createdAt", "updatedAt") FROM stdin;
f015d88a-520d-4dd4-9b43-af7352aa940c	PRD-0001	Sample Tee	A sample tee for testing	10000.00	unisex	\N	20	\N	\N	active	0.00	\N	2025-09-14 23:35:12.291	2025-09-14 23:35:12.291
\.


--
-- Data for Name: ProductCategory; Type: TABLE DATA; Schema: public; Owner: monicx_admin
--

COPY public."ProductCategory" ("productId", "categoryId") FROM stdin;
\.


--
-- Data for Name: ProductColor; Type: TABLE DATA; Schema: public; Owner: monicx_admin
--

COPY public."ProductColor" ("productId", "colorId") FROM stdin;
\.


--
-- Data for Name: ProductSizeStock; Type: TABLE DATA; Schema: public; Owner: monicx_admin
--

COPY public."ProductSizeStock" ("productId", "sizeId", qty) FROM stdin;
\.


--
-- Data for Name: ProductTag; Type: TABLE DATA; Schema: public; Owner: monicx_admin
--

COPY public."ProductTag" ("productId", "tagId") FROM stdin;
\.


--
-- Data for Name: Size; Type: TABLE DATA; Schema: public; Owner: monicx_admin
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
-- Data for Name: Tag; Type: TABLE DATA; Schema: public; Owner: monicx_admin
--

COPY public."Tag" (id, name) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: monicx_admin
--

COPY public."User" (id, email, password, "firstName", "lastName", role, "createdAt") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: monicx_admin
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
a865c026-5d55-4886-801f-79ed75d5814a	740a8a3fa11f71f573a9b1717e5a2c48df4a9e67d78ef3e74e591d939dd6249b	2025-09-14 19:00:52.67784+01	20250914180052_init_monicx	\N	\N	2025-09-14 19:00:52.504566+01	1
2862191e-b7b2-4e39-ba06-dce6c6291554	e12c85f19b26c6938269b2dfc3755788f7483f22d2caa16ad0dd7d0289c1b8b5	\N	20250921134646_add_slug_shortdes	A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20250921134646_add_slug_shortdes\n\nDatabase error code: 23502\n\nDatabase error:\nERROR: column "slug" of relation "Product" contains null values\n\nDbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E23502), message: "column \\"slug\\" of relation \\"Product\\" contains null values", detail: None, hint: None, position: None, where_: None, schema: Some("public"), table: Some("Product"), column: Some("slug"), datatype: None, constraint: None, file: Some("tablecmds.c"), line: Some(6284), routine: Some("ATRewriteTable") }\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name="20250921134646_add_slug_shortdes"\n             at schema-engine\\connectors\\sql-schema-connector\\src\\apply_migration.rs:113\n   1: schema_commands::commands::apply_migrations::Applying migration\n           with migration_name="20250921134646_add_slug_shortdes"\n             at schema-engine\\commands\\src\\commands\\apply_migrations.rs:95\n   2: schema_core::state::ApplyMigrations\n             at schema-engine\\core\\src\\state.rs:236	\N	2025-09-21 14:47:16.478551+01	0
\.


--
-- Name: Address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: monicx_admin
--

SELECT pg_catalog.setval('public."Address_id_seq"', 1, false);


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: monicx_admin
--

SELECT pg_catalog.setval('public."Category_id_seq"', 2, true);


--
-- Name: Collection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: monicx_admin
--

SELECT pg_catalog.setval('public."Collection_id_seq"', 4, true);


--
-- Name: Color_id_seq; Type: SEQUENCE SET; Schema: public; Owner: monicx_admin
--

SELECT pg_catalog.setval('public."Color_id_seq"', 11, true);


--
-- Name: Offer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: monicx_admin
--

SELECT pg_catalog.setval('public."Offer_id_seq"', 1, false);


--
-- Name: Order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: monicx_admin
--

SELECT pg_catalog.setval('public."Order_id_seq"', 1, false);


--
-- Name: Size_id_seq; Type: SEQUENCE SET; Schema: public; Owner: monicx_admin
--

SELECT pg_catalog.setval('public."Size_id_seq"', 21, true);


--
-- Name: Tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: monicx_admin
--

SELECT pg_catalog.setval('public."Tag_id_seq"', 1, false);


--
-- Name: Address Address_pkey; Type: CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Collection Collection_pkey; Type: CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Collection"
    ADD CONSTRAINT "Collection_pkey" PRIMARY KEY (id);


--
-- Name: Color Color_pkey; Type: CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Color"
    ADD CONSTRAINT "Color_pkey" PRIMARY KEY (id);


--
-- Name: Offer Offer_pkey; Type: CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Offer"
    ADD CONSTRAINT "Offer_pkey" PRIMARY KEY (id);


--
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("orderId", "productId");


--
-- Name: OrderOffer OrderOffer_pkey; Type: CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."OrderOffer"
    ADD CONSTRAINT "OrderOffer_pkey" PRIMARY KEY ("orderId", "offerId");


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: ProductCategory ProductCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."ProductCategory"
    ADD CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("productId", "categoryId");


--
-- Name: ProductColor ProductColor_pkey; Type: CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."ProductColor"
    ADD CONSTRAINT "ProductColor_pkey" PRIMARY KEY ("productId", "colorId");


--
-- Name: ProductSizeStock ProductSizeStock_pkey; Type: CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."ProductSizeStock"
    ADD CONSTRAINT "ProductSizeStock_pkey" PRIMARY KEY ("productId", "sizeId");


--
-- Name: ProductTag ProductTag_pkey; Type: CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."ProductTag"
    ADD CONSTRAINT "ProductTag_pkey" PRIMARY KEY ("productId", "tagId");


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: Size Size_pkey; Type: CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Size"
    ADD CONSTRAINT "Size_pkey" PRIMARY KEY (id);


--
-- Name: Tag Tag_pkey; Type: CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Category_slug_key; Type: INDEX; Schema: public; Owner: monicx_admin
--

CREATE UNIQUE INDEX "Category_slug_key" ON public."Category" USING btree (slug);


--
-- Name: Color_hexCode_key; Type: INDEX; Schema: public; Owner: monicx_admin
--

CREATE UNIQUE INDEX "Color_hexCode_key" ON public."Color" USING btree ("hexCode");


--
-- Name: Offer_code_key; Type: INDEX; Schema: public; Owner: monicx_admin
--

CREATE UNIQUE INDEX "Offer_code_key" ON public."Offer" USING btree (code);


--
-- Name: ProductCategory_categoryId_idx; Type: INDEX; Schema: public; Owner: monicx_admin
--

CREATE INDEX "ProductCategory_categoryId_idx" ON public."ProductCategory" USING btree ("categoryId");


--
-- Name: ProductColor_colorId_idx; Type: INDEX; Schema: public; Owner: monicx_admin
--

CREATE INDEX "ProductColor_colorId_idx" ON public."ProductColor" USING btree ("colorId");


--
-- Name: ProductSizeStock_sizeId_idx; Type: INDEX; Schema: public; Owner: monicx_admin
--

CREATE INDEX "ProductSizeStock_sizeId_idx" ON public."ProductSizeStock" USING btree ("sizeId");


--
-- Name: ProductTag_tagId_idx; Type: INDEX; Schema: public; Owner: monicx_admin
--

CREATE INDEX "ProductTag_tagId_idx" ON public."ProductTag" USING btree ("tagId");


--
-- Name: Product_sku_key; Type: INDEX; Schema: public; Owner: monicx_admin
--

CREATE UNIQUE INDEX "Product_sku_key" ON public."Product" USING btree (sku);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: monicx_admin
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Address Address_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrderItem OrderItem_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrderItem OrderItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderOffer OrderOffer_offerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."OrderOffer"
    ADD CONSTRAINT "OrderOffer_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES public."Offer"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrderOffer OrderOffer_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."OrderOffer"
    ADD CONSTRAINT "OrderOffer_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProductCategory ProductCategory_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."ProductCategory"
    ADD CONSTRAINT "ProductCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductCategory ProductCategory_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."ProductCategory"
    ADD CONSTRAINT "ProductCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductColor ProductColor_colorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."ProductColor"
    ADD CONSTRAINT "ProductColor_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES public."Color"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductColor ProductColor_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."ProductColor"
    ADD CONSTRAINT "ProductColor_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductSizeStock ProductSizeStock_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."ProductSizeStock"
    ADD CONSTRAINT "ProductSizeStock_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductSizeStock ProductSizeStock_sizeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."ProductSizeStock"
    ADD CONSTRAINT "ProductSizeStock_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES public."Size"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProductTag ProductTag_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."ProductTag"
    ADD CONSTRAINT "ProductTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductTag ProductTag_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."ProductTag"
    ADD CONSTRAINT "ProductTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Product Product_collectionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: monicx_admin
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES public."Collection"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict JHwSgfGQ68UwwxSWVgEXbZ3CMnmbQKHXjomduey8ttvfSnMno7JXMBaChJea8mS

