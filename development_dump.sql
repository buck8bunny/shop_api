--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15 (Ubuntu 14.15-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.15 (Ubuntu 14.15-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: senso
--

CREATE TABLE public.ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.ar_internal_metadata OWNER TO senso;

--
-- Name: items; Type: TABLE; Schema: public; Owner: senso
--

CREATE TABLE public.items (
    id bigint NOT NULL,
    name character varying,
    description text,
    price numeric,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.items OWNER TO senso;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: senso
--

CREATE SEQUENCE public.items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO senso;

--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: senso
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- Name: order_descriptions; Type: TABLE; Schema: public; Owner: senso
--

CREATE TABLE public.order_descriptions (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    item_id bigint NOT NULL,
    quantity integer,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.order_descriptions OWNER TO senso;

--
-- Name: order_descriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: senso
--

CREATE SEQUENCE public.order_descriptions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_descriptions_id_seq OWNER TO senso;

--
-- Name: order_descriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: senso
--

ALTER SEQUENCE public.order_descriptions_id_seq OWNED BY public.order_descriptions.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: senso
--

CREATE TABLE public.orders (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    amount numeric,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.orders OWNER TO senso;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: senso
--

CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO senso;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: senso
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: senso
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


ALTER TABLE public.schema_migrations OWNER TO senso;

--
-- Name: users; Type: TABLE; Schema: public; Owner: senso
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    encrypted_password character varying DEFAULT ''::character varying NOT NULL,
    reset_password_token character varying,
    reset_password_sent_at timestamp(6) without time zone,
    remember_created_at timestamp(6) without time zone,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    first_name character varying,
    last_name character varying,
    role integer DEFAULT 0,
    provider character varying DEFAULT 'email'::character varying NOT NULL,
    uid character varying DEFAULT ''::character varying NOT NULL,
    tokens json,
    confirmation_token character varying,
    confirmed_at timestamp(6) without time zone,
    confirmation_sent_at timestamp(6) without time zone,
    unconfirmed_email character varying,
    allow_password_change boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO senso;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: senso
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO senso;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: senso
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: items id; Type: DEFAULT; Schema: public; Owner: senso
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- Name: order_descriptions id; Type: DEFAULT; Schema: public; Owner: senso
--

ALTER TABLE ONLY public.order_descriptions ALTER COLUMN id SET DEFAULT nextval('public.order_descriptions_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: senso
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: senso
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: ar_internal_metadata; Type: TABLE DATA; Schema: public; Owner: senso
--

COPY public.ar_internal_metadata (key, value, created_at, updated_at) FROM stdin;
environment	development	2024-12-26 15:27:13.883819	2024-12-26 15:27:13.883821
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: senso
--

COPY public.items (id, name, description, price, created_at, updated_at) FROM stdin;
10	lego car	lego toy mazda	345.0	2024-12-30 11:19:15.117373	2024-12-30 11:19:15.117373
3	iphone 16	iphone 16 256gb	1500.0	2024-12-30 10:56:48.87478	2024-12-30 13:11:01.639091
1	RTX3070	MSI RTX3070 	550.0	2024-12-30 10:40:57.937541	2024-12-30 13:22:17.919089
2	Soda	soda pepsi	1.5	2024-12-30 10:56:11.905078	2024-12-30 13:42:15.249907
11	chips	lays 100g	2.5	2024-12-30 13:42:53.786877	2024-12-30 13:42:53.786877
12	Samsung phone	 Samsung Galaxy S24 8/256Gb Onyx Black	840.0	2025-01-03 14:27:21.243744	2025-01-03 14:27:45.775078
\.


--
-- Data for Name: order_descriptions; Type: TABLE DATA; Schema: public; Owner: senso
--

COPY public.order_descriptions (id, order_id, item_id, quantity, created_at, updated_at) FROM stdin;
1	9	10	1	2024-12-30 12:21:27.536754	2024-12-30 12:21:27.536754
4	10	3	21	2024-12-30 12:23:12.152949	2024-12-30 12:23:12.152949
5	11	10	3	2024-12-30 12:24:25.19272	2024-12-30 12:24:25.19272
7	11	2	1	2024-12-30 12:24:25.230127	2024-12-30 12:24:25.230127
8	12	2	13	2024-12-30 12:30:10.259642	2024-12-30 12:30:10.259642
9	12	10	1	2024-12-30 12:30:10.276258	2024-12-30 12:30:10.276258
11	13	2	4	2024-12-30 12:45:16.509257	2024-12-30 12:45:16.509257
12	14	10	1	2024-12-30 12:51:31.569091	2024-12-30 12:51:31.569091
13	15	3	3	2024-12-30 13:43:31.834087	2024-12-30 13:43:31.834087
14	16	11	12	2025-01-03 12:59:21.22121	2025-01-03 12:59:21.22121
15	17	10	10	2025-01-03 14:23:46.022722	2025-01-03 14:23:46.022722
16	18	12	2	2025-01-03 22:27:44.612971	2025-01-03 22:27:44.612971
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: senso
--

COPY public.orders (id, user_id, amount, created_at, updated_at) FROM stdin;
1	10	345.0	2024-12-30 11:25:03.525373	2024-12-30 11:25:03.525373
2	10	345.0	2024-12-30 11:27:15.01057	2024-12-30 11:27:15.01057
3	10	345.0	2024-12-30 11:38:13.35205	2024-12-30 11:38:13.35205
4	10	345.0	2024-12-30 11:41:02.090835	2024-12-30 11:41:02.090835
5	10	345.0	2024-12-30 11:44:47.671331	2024-12-30 11:44:47.671331
6	10	5742.45641	2024-12-30 11:45:35.122614	2024-12-30 11:45:35.122614
7	10	345801.35	2024-12-30 11:49:10.130884	2024-12-30 11:49:10.130884
8	10	345.0	2024-12-30 12:18:56.733325	2024-12-30 12:18:56.733325
9	10	345.0	2024-12-30 12:21:27.43584	2024-12-30 12:21:27.43584
10	6	2163.45641	2024-12-30 12:23:11.997943	2024-12-30 12:23:11.997943
11	6	346491.35	2024-12-30 12:24:23.998312	2024-12-30 12:24:23.998312
12	6	2574.1141	2024-12-30 12:30:10.149155	2024-12-30 12:30:10.149155
13	6	1.4	2024-12-30 12:45:16.419426	2024-12-30 12:45:16.419426
14	6	345.0	2024-12-30 12:51:31.44659	2024-12-30 12:51:31.44659
15	6	4500.0	2024-12-30 13:43:31.718001	2024-12-30 13:43:31.718001
16	6	30.0	2025-01-03 12:59:21.056127	2025-01-03 12:59:21.056127
17	10	3450.0	2025-01-03 14:23:45.879279	2025-01-03 14:23:45.879279
18	11	1680.0	2025-01-03 22:27:44.450872	2025-01-03 22:27:44.450872
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: senso
--

COPY public.schema_migrations (version) FROM stdin;
20241226152047
20241226152626
20241226152727
20241226152801
20241226152828
20241227215148
20241228005748
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: senso
--

COPY public.users (id, email, encrypted_password, reset_password_token, reset_password_sent_at, remember_created_at, created_at, updated_at, first_name, last_name, role, provider, uid, tokens, confirmation_token, confirmed_at, confirmation_sent_at, unconfirmed_email, allow_password_change) FROM stdin;
7	admin2@example.com	$2a$12$YsDB8ToUI16pPrhVq./0P.NnYI1FhgFX8iF7YprHNn9G907SAtKv.	\N	\N	\N	2024-12-27 22:38:50.508807	2024-12-27 22:41:09.004016	trhrth	rttrhht	0	email	admin2@example.com	"{\\"aOpR_1R3QTLGzuUHReolLg\\":{\\"token\\":\\"$2a$10$XvnL0S3GwEYR4ywvxCJDDugDhNpSXqJhE3Fz.GsxeBsIzffrsPovq\\",\\"expiry\\":1736548736,\\"previous_token\\":\\"$2a$10$wzTnycaF96teP/y9CUChAOn.y315KHqoQEMYjLZdx/b.AlsWb7fMq\\",\\"updated_at\\":\\"2024-12-27T22:38:56Z\\"},\\"KFke0FmiPiX3fPHvg6RpRQ\\":{\\"token\\":\\"$2a$10$gUV8G/bEJhx.8iWFOetRPO8UPo27GkOiMPK6afJfVhizcrZqW.AyW\\",\\"expiry\\":1736548869,\\"previous_token\\":\\"$2a$10$IYGF5e2ayTx5RnvR/S..oOlEdNm4T1Zy3ZVLAR1XZm0D2j1Bf8h4q\\",\\"updated_at\\":\\"2024-12-27T22:41:08Z\\"}}"	\N	\N	\N	\N	f
1	test44@gmail.com	$2a$12$Xf3HO7KuHONiMwRAZvrbA.BUKC4RJjCLcecXpZBV6sAKq3OJLE.AO	\N	\N	\N	2024-12-26 23:50:30.61735	2024-12-26 23:50:30.61735	ARTEM	KHLIPITKO	0	email	test44@gmail.com	\N	\N	\N	\N	\N	f
3	test21@gmail.com	$2a$12$x5VfdkcfAm4Qza5xHsm9pOusfTS3UNkbZXAfpgWsfFuDpocpHcuuq	\N	\N	\N	2024-12-27 10:50:06.715344	2024-12-27 20:34:15.033309	Andy	Test	0	email	test21@gmail.com	\N	\N	\N	\N	\N	f
4	artem@gmail.com	$2a$12$4LsSyWGKwa4LXzczcFE6.eDAsAQ91DBaRotN/L7SmdlqE7kvgxFL.	\N	\N	\N	2024-12-27 10:59:52.721899	2024-12-27 10:59:52.721899	Artem	Kh.	0	email	artem@gmail.com	\N	\N	\N	\N	\N	f
11	eyf@gmail.com	$2a$12$bO55JC8f25jTGC9lVudc.uj6hEDjzwKG/sN8JCbpZyNRJDJWO4uFG	\N	\N	\N	2025-01-03 13:55:51.594925	2025-01-04 17:07:28.565619	Oleg	Pavlov	1	email	eyf@gmail.com	"{\\"e25BtWhceJtG2Nkm_vwj5Q\\":{\\"token\\":\\"$2a$10$LM6/KRPTfRm.owiLB4tuEujBUUox8JznglCDSTACeqTXlgFA8no9O\\",\\"expiry\\":1737194698},\\"EtGnxwHG22YNib7SlPEflw\\":{\\"token\\":\\"$2a$10$iups.6GrQeJzonlkgkoqaOHzqCgE70io.Guxd2LrPu9fZ7UvoXU9m\\",\\"expiry\\":1737195532},\\"9YSnESKB1TGjKk3uNUNXfg\\":{\\"token\\":\\"$2a$10$1UTa9petK4P2D5cpAXj2M.rSndCgXNII8sQcqg/EQQRfIt4P3KvMS\\",\\"expiry\\":1737199447},\\"QeQAl9nAz2Lef005_xlsMg\\":{\\"token\\":\\"$2a$10$JpdKdmafXigg7QItoT5W5uKjGdlTI1FhrU/XdwVk6Wn5TfIYtVvTm\\",\\"expiry\\":1737200949},\\"OeIYdqXzxPS_vvJLa33xvA\\":{\\"token\\":\\"$2a$10$CaeGfoxjD8nV3RuAmuymu.aIfA8JufFzhk3Mc339pnKsB4qa8bxny\\",\\"expiry\\":1737200998},\\"5D-09x0pUHbFDamiq0ArxA\\":{\\"token\\":\\"$2a$10$Kvg/d/wnTYKJcII8NwnxCuJF3S4Etq5UuJ0UwyEz5SITMJiuhOhLi\\",\\"expiry\\":1737201620},\\"bZ_qZcvut5wVLD7Um_Ppbw\\":{\\"token\\":\\"$2a$10$NRmdnD2fHrCvirrgfcCP3.GYmp3y8BwQcdjifi.XsS8rhzq0rcJzC\\",\\"expiry\\":1737201819},\\"GYBIZTwTnBUItPY1qJrqCQ\\":{\\"token\\":\\"$2a$10$GTtwhn6Ww7RC1N4NBgqbwuAKl/Joo7.HLxB1IDEW9OzWH7oOZuyDa\\",\\"expiry\\":1737202155},\\"Lor_sPmCAE752TNQEMWkfA\\":{\\"token\\":\\"$2a$10$a7ECwea32golJ0Ujx5Edne5jRl5n3d1KGbzyck9wZI5hBmzlKSSTK\\",\\"expiry\\":1737218159},\\"sXWt_x63_VPmvi57kL9H6A\\":{\\"token\\":\\"$2a$10$yD6qBBw5nUD9QzobzftD7.WBc6kmsoBvRUGHpC8oyctINIjlEz2AC\\",\\"expiry\\":1737220048}}"	\N	\N	\N	\N	f
8	adrgrgmin@example.com	$2a$12$ZjVa0WfgHUzhXoKBtczmAewDENGVV0B8HhOlxSgop33YpWbkHwh8i	\N	\N	\N	2024-12-27 22:54:33.407632	2024-12-27 22:54:33.407632	упцу4п	крукр	0	email	adrgrgmin@example.com	\N	\N	\N	\N	\N	f
6	dendy211@gmail.com	$2a$12$7zpGEwh9uB9ATVCCS4zH/uNLy9GrTXuhZK6cWMCH8k53FJDxAMbCm	\N	\N	\N	2024-12-27 19:47:21.032026	2025-01-04 10:33:32.243544	Dendy	Kostenko	0	email	dendy211@gmail.com	"{\\"sm4tyjQkf2q0WHuFWPIlfw\\":{\\"token\\":\\"$2a$10$C7WW0qaQaN7fuTWB5ILyueo0wz.kMtAqpEOHoUaouHMd3YmDPrh4y\\",\\"expiry\\":1737119548},\\"E7ENNCJcY65frNuhgcKt4g\\":{\\"token\\":\\"$2a$10$19s8IdCfeX2sekPYFp9RpO6tYK66AWAGCZqv9z/f0Tux0hq3XRLra\\",\\"expiry\\":1737120119},\\"GDrtdJR1wF3NprIRMN861w\\":{\\"token\\":\\"$2a$10$y74RQM/xIdn6rapSOAWZNOK.El2B/1A6fDrq4UjrlAvshj6EYSMNi\\",\\"expiry\\":1737120129},\\"deOmAAQom5gA_LjmiHk8UQ\\":{\\"token\\":\\"$2a$10$zljv8kkhLnP0Dw4h8H34ROOCCyMTV22Bi913fsXqGkc98h2vgjGca\\",\\"expiry\\":1737121363},\\"gMhrjiA21x05hmyX_nVDKw\\":{\\"token\\":\\"$2a$10$QEThzPmIiI4kHvAR46.VV.b1PEtre9qiahv7XFvsmDRZH0uUt01zi\\",\\"expiry\\":1737121386},\\"qTxfEA_xzz3x9ZAMyCmMSw\\":{\\"token\\":\\"$2a$10$8xYNjepY.ElL3peCqYv/BOhMgRmsDVb1VprRZ9eQjKU3wTOaIDHeS\\",\\"expiry\\":1737121392},\\"bz7BTUGksuKuLWGtz6mvSg\\":{\\"token\\":\\"$2a$10$GzC4l98mx.MOQ036rAFZ8OL4IgSFQ6AxRpDStd07VQE/F17GZ82Su\\",\\"expiry\\":1737121949},\\"oqj3HWBs5aCxPJ2pYT6XjQ\\":{\\"token\\":\\"$2a$10$0NJKgKaEi5QVhKt900.q7e.ifzfqy.sPOviNXA21gfIvSRKAvFTTq\\",\\"expiry\\":1737123076},\\"4edWSgGCe_UBjuIkEGP1KQ\\":{\\"token\\":\\"$2a$10$QhFwfBL19ciUzNqNfuePleRMopPkkxZzizxcazHRA4zOiEUDmFhqq\\",\\"expiry\\":1737195516},\\"Sz3srYq88W3jYJIedVMc3w\\":{\\"token\\":\\"$2a$10$AqnyLMCtGc4loQa4/qy4qusazLtriaZ.hcTeE94Tw6MUtqiwcHQZq\\",\\"expiry\\":1737196412}}"	\N	\N	\N	\N	f
10	artemkhlipitko@gmail.com	$2a$12$bX4/4.o0tLyyi3goNdPTe.bZd366BBU1OzuhNirChhJRUxWkSla3m	\N	\N	\N	2024-12-30 10:18:19.744596	2024-12-30 10:52:03.795341	Stas	Khlipitko	0	email	artemkhlipitko@gmail.com	"{\\"slhVkqfZoCwFZ2GUjCZodg\\":{\\"token\\":\\"$2a$10$vABqpp5kp8SoORg5TIK4C.79bIU8dR3QshYw0F6EIeVwF0W/l5Uia\\",\\"expiry\\":1736763504},\\"Eas157w1l34pdqupInVvkg\\":{\\"token\\":\\"$2a$10$TS6IyvKMdWhBayeClVnc2..ziveKfZMDWOC2up90BWU04MXeZ/Qwm\\",\\"expiry\\":1736764236},\\"kgwK72ledBQjz5-lhlnB9g\\":{\\"token\\":\\"$2a$10$xDDcqJ6a1gFNjs8B6DY.KOon/40BVY0zFhTYgNPNG.0U1YVf.aZyG\\",\\"expiry\\":1736764942}}"	\N	\N	\N	\N	f
5	admin@example.com	$2a$12$LIP1wqi3/NdoamQZhkuRbub0STU1zJYvdCplzetajZQTH0moAesVm	\N	\N	\N	2024-12-27 17:47:50.343817	2025-01-04 16:34:27.950847	Admin	User2	1	email	admin@example.com	"{\\"LAbQG3nDEcTC-g6yWynDJw\\":{\\"token\\":\\"$2a$10$GgbTSzgzQfWUAFV1iJ0K3ueRR0P7aHXGyh2ZRevd.IAxte330WyUW\\",\\"expiry\\":1737122230},\\"b1_OmeSUkTaO_IWILQYrgA\\":{\\"token\\":\\"$2a$10$wiGNrKXxK/kF8tugsx7GienWW/LpJD76yQbi0ITvvtDr6XE5xdNCK\\",\\"expiry\\":1737122492},\\"Bekjmn3Upi039Rbh93nDNA\\":{\\"token\\":\\"$2a$10$7n0bvZwrXQfxS6VMc2Pk.OsJ2olM/G7X3JoP1tuKVtvamZY.b1ZaG\\",\\"expiry\\":1737195249},\\"sYej5L6rVfx9d13_WsMJzg\\":{\\"token\\":\\"$2a$10$imrHWz/HRyDgwfxVUNrQ6ObrIeUV6XWWZ.Y29aUpE.GFNGkFPENOW\\",\\"expiry\\":1737199653},\\"-oCgd7eYoPDdyCYc2UFE4Q\\":{\\"token\\":\\"$2a$10$2NUsUj587IbESR4O3X7L3unfKv5N0HXRXOC53kwsfusNH0p0J7mF2\\",\\"expiry\\":1737201919},\\"OVIHhFQSNFmKpDCIq2CyEw\\":{\\"token\\":\\"$2a$10$yJZnKB.xiQuTjoz6EQDDcekZ9heV0p7toIS.95yY/NGUSi7vv3vRC\\",\\"expiry\\":1737202140},\\"OOHtguJ8GLfgyyPaSZ6gyA\\":{\\"token\\":\\"$2a$10$Z6ICTHsoo8wt55CnQnLpR..CcqK1E9c9diPB2YcXxEjx4Dh4svSAq\\",\\"expiry\\":1737217660},\\"qGEgq1w9o_LwiJe6JgbjJg\\":{\\"token\\":\\"$2a$10$e.5cYlbeabBSaWl/u8qmZ.JN.2ke9KB/GlfyCe8XjwvPLYXzWatnC\\",\\"expiry\\":1737217696},\\"CRqquZYeQGVuIcI79tOYfA\\":{\\"token\\":\\"$2a$10$Z7EhNPboLXE9OwyWPUJ3WeV3F4EN7MXN7e1k.KQd4/F/5/HrjIX7m\\",\\"expiry\\":1737217776},\\"6QJwJWoaeRoHl3mgU5m_IQ\\":{\\"token\\":\\"$2a$10$x8A8Tg5KfLQO98lJ1YrFcOA5Aq5.aV4r7MJMLit4EwB8xL/FXWnrC\\",\\"expiry\\":1737218067}}"	\N	\N	\N	\N	f
9	admin3@example.com	$2a$12$f3WV9VRAtVtFYY/CqVowOuE9QOYNce9rB2eq8d9cr3zeZ67hD4lum	\N	\N	\N	2024-12-28 01:03:31.357483	2025-01-04 16:35:50.06624	Admin	User	0	email	admin3@example.com	\N	\N	\N	\N	\N	f
\.


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: senso
--

SELECT pg_catalog.setval('public.items_id_seq', 12, true);


--
-- Name: order_descriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: senso
--

SELECT pg_catalog.setval('public.order_descriptions_id_seq', 16, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: senso
--

SELECT pg_catalog.setval('public.orders_id_seq', 18, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: senso
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: senso
--

ALTER TABLE ONLY public.ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: senso
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: order_descriptions order_descriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: senso
--

ALTER TABLE ONLY public.order_descriptions
    ADD CONSTRAINT order_descriptions_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: senso
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: senso
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: senso
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: index_order_descriptions_on_item_id; Type: INDEX; Schema: public; Owner: senso
--

CREATE INDEX index_order_descriptions_on_item_id ON public.order_descriptions USING btree (item_id);


--
-- Name: index_order_descriptions_on_order_id; Type: INDEX; Schema: public; Owner: senso
--

CREATE INDEX index_order_descriptions_on_order_id ON public.order_descriptions USING btree (order_id);


--
-- Name: index_orders_on_user_id; Type: INDEX; Schema: public; Owner: senso
--

CREATE INDEX index_orders_on_user_id ON public.orders USING btree (user_id);


--
-- Name: index_users_on_confirmation_token; Type: INDEX; Schema: public; Owner: senso
--

CREATE UNIQUE INDEX index_users_on_confirmation_token ON public.users USING btree (confirmation_token);


--
-- Name: index_users_on_email; Type: INDEX; Schema: public; Owner: senso
--

CREATE UNIQUE INDEX index_users_on_email ON public.users USING btree (email);


--
-- Name: index_users_on_reset_password_token; Type: INDEX; Schema: public; Owner: senso
--

CREATE UNIQUE INDEX index_users_on_reset_password_token ON public.users USING btree (reset_password_token);


--
-- Name: index_users_on_uid_and_provider; Type: INDEX; Schema: public; Owner: senso
--

CREATE UNIQUE INDEX index_users_on_uid_and_provider ON public.users USING btree (uid, provider);


--
-- Name: order_descriptions fk_rails_3053a61d6f; Type: FK CONSTRAINT; Schema: public; Owner: senso
--

ALTER TABLE ONLY public.order_descriptions
    ADD CONSTRAINT fk_rails_3053a61d6f FOREIGN KEY (item_id) REFERENCES public.items(id);


--
-- Name: order_descriptions fk_rails_9f0bfa5328; Type: FK CONSTRAINT; Schema: public; Owner: senso
--

ALTER TABLE ONLY public.order_descriptions
    ADD CONSTRAINT fk_rails_9f0bfa5328 FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: orders fk_rails_f868b47f6a; Type: FK CONSTRAINT; Schema: public; Owner: senso
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_rails_f868b47f6a FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

