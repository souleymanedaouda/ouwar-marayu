
-- Table des articles/actualités
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des dons/collectes
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT,
  email TEXT,
  amount NUMERIC NOT NULL,
  campaign TEXT DEFAULT 'general',
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des messages de contact
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des images de la galerie
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des membres de l'équipe
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des actions/projets
CREATE TABLE public.actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Heart',
  image_url TEXT,
  category TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.actions ENABLE ROW LEVEL SECURITY;

-- Public read policies for content tables
CREATE POLICY "Anyone can read published articles" ON public.articles FOR SELECT USING (published = true);
CREATE POLICY "Anyone can read gallery images" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Anyone can read team members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Anyone can read actions" ON public.actions FOR SELECT USING (true);

-- Anyone can submit contact messages and donations
CREATE POLICY "Anyone can submit contact" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit donation" ON public.donations FOR INSERT WITH CHECK (true);
