'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Heading, Text, Link } from '@/components/ui/Typography';
import { Container } from '@/components/ui/Container';
import { Grid, GridItem } from '@/components/ui/Grid';
import { HeroSection } from '@/components/ui/HeroSection';
import { Section } from '@/components/ui/Section';
import { ImageSlider } from '@/components/ui/ImageSlider';
import { Footer } from '@/components/ui/Footer';
import { ProjectGrid } from '@/components/ui/ProjectGrid';
import { PressList } from '@/components/ui/PressList';

export default function ComponentShowcase() {
  return (
    <div className="space-y-16">
      {/* Typography Section */}
      <Section spacing="md" background="white">
        <Container>
          <div className="mb-8">
            <Heading variant="h2" className="mb-4">Typography</Heading>
            <Text color="muted">텍스트 및 제목 컴포넌트</Text>
          </div>
          
          <div className="space-y-6">
            <div>
              <Text variant="small" color="muted" className="mb-2">Headings</Text>
              <div className="space-y-4">
                <Heading variant="h1">건축으로 만드는 세상</Heading>
                <Heading variant="h2">프로젝트 포트폴리오</Heading>
                <Heading variant="h3">디자인 철학과 가치</Heading>
                <Heading variant="h4">상세 정보 및 연락처</Heading>
              </div>
            </div>
            
            <div>
              <Text variant="small" color="muted" className="mb-2">한영 혼용 제목</Text>
              <div className="space-y-4">
                <Heading variant="h1">SOW Architecture Studio</Heading>
                <Heading variant="h2">Project & Portfolio</Heading>
                <Heading variant="h3">About Our Practice</Heading>
              </div>
            </div>
            
            <div>
              <Text variant="small" color="muted" className="mb-2">Text Variants</Text>
              <div className="space-y-2">
                <Text variant="large">
                  우리는 건축을 통해 사람들의 삶을 더욱 풍요롭게 만들고자 합니다.
                </Text>
                <Text variant="medium">
                  각 프로젝트는 고유한 컨텍스트와 사용자의 요구를 반영합니다.
                </Text>
                <Text variant="small">
                  지속가능하고 혁신적인 디자인 솔루션을 제공합니다.
                </Text>
                <Text variant="caption">2024년 상반기 준공 프로젝트</Text>
              </div>
            </div>
            
            <div>
              <Text variant="small" color="muted" className="mb-2">색상별 텍스트</Text>
              <div className="space-y-2">
                <Text color="primary">주요 텍스트 - Primary color text</Text>
                <Text color="secondary">보조 텍스트 - Secondary color text</Text>
                <Text color="muted">부가 정보 - Muted color text</Text>
              </div>
            </div>
            
            <div>
              <Text variant="small" color="muted" className="mb-2">Links</Text>
              <div className="space-y-2">
                <div><Link href="#" external>External Link</Link></div>
                <div><Link href="#">Internal Link</Link></div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Buttons Section */}
      <Section spacing="md" background="gray">
        <Container>
          <div className="mb-8">
            <Heading variant="h2" className="mb-4">Buttons</Heading>
            <Text color="muted">버튼 컴포넌트 variants</Text>
          </div>
          
          <div className="space-y-6">
            <div>
              <Text variant="small" color="muted" className="mb-4">Primary Buttons</Text>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="sm">Small Primary</Button>
                <Button variant="primary" size="md">Medium Primary</Button>
                <Button variant="primary" size="lg">Large Primary</Button>
              </div>
            </div>
            
            <div>
              <Text variant="small" color="muted" className="mb-4">Secondary Buttons</Text>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="sm">Small Secondary</Button>
                <Button variant="secondary" size="md">Medium Secondary</Button>
                <Button variant="secondary" size="lg">Large Secondary</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Cards Section */}
      <Section spacing="md" background="white">
        <Container>
          <div className="mb-8">
            <Heading variant="h2" className="mb-4">Cards</Heading>
            <Text color="muted">카드 컴포넌트 레이아웃</Text>
          </div>
          
          <Grid cols={3} gap="lg">
            <GridItem>
              <Card>
                <CardHeader>
                  <Heading variant="h4">Project Card</Heading>
                </CardHeader>
                <CardContent>
                  <Text color="muted">
                    프로젝트 설명이 들어갈 자리입니다. 건축 프로젝트의 주요 정보를 표시합니다.
                  </Text>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" size="sm">자세히 보기</Button>
                </CardFooter>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card>
                <CardHeader>
                  <Heading variant="h4">Press Card</Heading>
                </CardHeader>
                <CardContent>
                  <Text color="muted">
                    언론 보도 내용이 들어갈 자리입니다. 뉴스 기사나 수상 소식을 표시합니다.
                  </Text>
                </CardContent>
                <CardFooter>
                  <Text variant="small" color="muted">2024.01.15</Text>
                </CardFooter>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card hover={false}>
                <CardHeader>
                  <Heading variant="h4">Static Card</Heading>
                </CardHeader>
                <CardContent>
                  <Text color="muted">
                    hover 효과가 없는 정적 카드입니다. 정보 표시용으로 사용됩니다.
                  </Text>
                </CardContent>
              </Card>
            </GridItem>
          </Grid>
        </Container>
      </Section>

      {/* Layout Components */}
      <Section spacing="md" background="gray">
        <Container>
          <div className="mb-8">
            <Heading variant="h2" className="mb-4">Layout Components</Heading>
            <Text color="muted">레이아웃 및 그리드 시스템</Text>
          </div>
          
          <div className="space-y-8">
            <div>
              <Text variant="small" color="muted" className="mb-4">Container Sizes</Text>
              <div className="space-y-4">
                <Container size="sm" className="bg-blue-100 dark:bg-blue-900 p-4">
                  <Text>Small Container (max-w-3xl)</Text>
                </Container>
                <Container size="md" className="bg-green-100 dark:bg-green-900 p-4">
                  <Text>Medium Container (max-w-4xl)</Text>
                </Container>
                <Container size="lg" className="bg-yellow-100 dark:bg-yellow-900 p-4">
                  <Text>Large Container (max-w-6xl)</Text>
                </Container>
              </div>
            </div>
            
            <div>
              <Text variant="small" color="muted" className="mb-4">Grid Systems</Text>
              <div className="space-y-6">
                <div>
                  <Text variant="caption" className="mb-2">2 Column Grid</Text>
                  <Grid cols={2} gap="md">
                    <GridItem className="bg-gray-200 dark:bg-gray-700 p-4">
                      <Text>Column 1</Text>
                    </GridItem>
                    <GridItem className="bg-gray-200 dark:bg-gray-700 p-4">
                      <Text>Column 2</Text>
                    </GridItem>
                  </Grid>
                </div>
                
                <div>
                  <Text variant="caption" className="mb-2">4 Column Grid</Text>
                  <Grid cols={4} gap="sm">
                    {[1, 2, 3, 4].map((num) => (
                      <GridItem key={num} className="bg-gray-200 dark:bg-gray-700 p-4">
                        <Text variant="small">Col {num}</Text>
                      </GridItem>
                    ))}
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Hero Section Demo */}
      <div className="mb-8">
        <Container>
          <Heading variant="h2" className="mb-4">Hero Section</Heading>
          <Text color="muted" className="mb-8">히어로 섹션 컴포넌트 (미니 버전)</Text>
        </Container>
        
        <HeroSection 
          className="min-h-[400px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
          centered
        >
          <Container>
            <div className="text-center">
              <Heading variant="h1" className="mb-6">SOW Architecture</Heading>
              <Text variant="large" color="secondary" className="mb-8">
                건축을 통해 더 나은 세상을 만들어갑니다
              </Text>
              <div className="flex justify-center gap-4">
                <Button variant="primary" size="lg">프로젝트 보기</Button>
                <Button variant="secondary" size="lg">문의하기</Button>
              </div>
            </div>
          </Container>
        </HeroSection>
      </div>

      {/* Color Palette */}
      <Section spacing="md" background="white">
        <Container>
          <div className="mb-8">
            <Heading variant="h2" className="mb-4">Color Palette</Heading>
            <Text color="muted">아키텍처 가이드 기반 색상 팔레트</Text>
          </div>
          
          <div className="space-y-6">
            <div>
              <Text variant="small" color="muted" className="mb-4">Primary Colors</Text>
              <div className="grid grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="w-full h-20 bg-black mb-2"></div>
                  <Text variant="caption">#000000</Text>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-white border mb-2"></div>
                  <Text variant="caption">#FFFFFF</Text>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-gray-800 mb-2"></div>
                  <Text variant="caption">#333333</Text>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-gray-600 mb-2"></div>
                  <Text variant="caption">#666666</Text>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-gray-400 mb-2"></div>
                  <Text variant="caption">#999999</Text>
                </div>
              </div>
            </div>
            
            <div>
              <Text variant="small" color="muted" className="mb-4">Accent Colors</Text>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-full h-20 bg-gray-100 border mb-2"></div>
                  <Text variant="caption">#F5F5F5</Text>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-gray-200 mb-2"></div>
                  <Text variant="caption">#E8E8E8</Text>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-gray-700 mb-2"></div>
                  <Text variant="caption">#2C2C2C</Text>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Image Slider Section */}
      <Section spacing="md" background="gray">
        <Container>
          <div className="mb-8">
            <Heading variant="h2" className="mb-4">Image Slider</Heading>
            <Text color="muted">이미지 슬라이드 컴포넌트</Text>
          </div>
          
          <div className="space-y-8">
            <div>
              <Text variant="small" color="muted" className="mb-4">기본 슬라이더</Text>
              <ImageSlider
                images={[
                  {
                    src: "https://ojgtlfcjwlvquikgjlak.supabase.co/storage/v1/object/public/atelier-sow/arirang/DSCF6826.webp",
                    alt: "아리랑도원 프로젝트",
                    caption: "아리랑도원 - 일월오봉도가 멋진 한국적 카페"
                  },
                  {
                    src: "https://ojgtlfcjwlvquikgjlak.supabase.co/storage/v1/object/public/atelier-sow/pp/DSCF1985.webp",
                    alt: "삐삣버거 프로젝트",
                    caption: "삐삣버거 - 수원 스타필드 수제버거 브랜드"
                  },
                  {
                    src: "https://ojgtlfcjwlvquikgjlak.supabase.co/storage/v1/object/public/atelier-sow/jjj/DSC03202.webp",
                    alt: "장정정 프로젝트",
                    caption: "장정정 - 선릉역 일식 다이닝"
                  }
                ]}
                aspectRatio="16:9"
                showThumbnails={true}
                className="max-w-4xl mx-auto"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Project Components */}
      <Section spacing="md" background="white">
        <Container>
          <div className="mb-8">
            <Heading variant="h2" className="mb-4">Project Components</Heading>
            <Text color="muted">프로젝트 관련 컴포넌트들</Text>
          </div>
          
          <div className="space-y-12">
            <div>
              <Text variant="small" color="muted" className="mb-4">Project Grid</Text>
              <ProjectGrid
                projects={[
                  {
                    id: 1,
                    title: "아리랑도원",
                    subtitle: "일월오봉도가 멋진 한국적 카페",
                    main_image: "https://ojgtlfcjwlvquikgjlak.supabase.co/storage/v1/object/public/atelier-sow/arirang/DSCF6826.webp",
                    year: "2024",
                    location: "서울",
                    category: "카페"
                  },
                  {
                    id: 2,
                    title: "삐삣버거",
                    subtitle: "수원 스타필드 수제버거 브랜드",
                    main_image: "https://ojgtlfcjwlvquikgjlak.supabase.co/storage/v1/object/public/atelier-sow/pp/DSCF1985.webp",
                    year: "2024",
                    location: "수원",
                    category: "레스토랑"
                  },
                  {
                    id: 3,
                    title: "장정정",
                    subtitle: "선릉역 일식 다이닝",
                    main_image: "https://ojgtlfcjwlvquikgjlak.supabase.co/storage/v1/object/public/atelier-sow/jjj/DSC03202.webp",
                    year: "2023",
                    location: "서울",
                    category: "레스토랑"
                  }
                ]}
                columns={3}
                aspectRatio="4:3"
                hoverEffect="lift"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Press Components */}
      <Section spacing="md" background="gray">
        <Container>
          <div className="mb-8">
            <Heading variant="h2" className="mb-4">Press Components</Heading>
            <Text color="muted">보도자료 관련 컴포넌트들</Text>
          </div>
          
          <div className="space-y-12">
            <div>
              <Text variant="small" color="muted" className="mb-4">Press List - Grid Layout</Text>
              <PressList
                layout="grid"
                columns={2}
                items={[
                  {
                    id: 1,
                    title: "SOW Architecture 2024년 상반기 프로젝트 수상",
                    excerpt: "건축사무소 SOW가 2024년 상반기 진행한 프로젝트들이 다양한 건축상을 수상했습니다.",
                    publication_date: "2024-07-15",
                    category: "수상",
                    publication_name: "건축신문"
                  },
                  {
                    id: 2,
                    title: "지속가능한 건축 디자인의 새로운 패러다임",
                    excerpt: "환경을 고려한 친환경 건축 디자인이 주목받고 있는 가운데, SOW의 새로운 접근법이 화제입니다.",
                    publication_date: "2024-06-20",
                    category: "인터뷰",
                    publication_name: "디자인매거진"
                  }
                ]}
              />
            </div>
            
            <div>
              <Text variant="small" color="muted" className="mb-4">Press List - List Layout</Text>
              <PressList
                layout="list"
                items={[
                  {
                    id: 3,
                    title: "SOW Architecture, 서울 도심 속 새로운 카페 공간 오픈",
                    excerpt: "전통과 현대가 조화를 이루는 독특한 공간 디자인으로 주목받고 있습니다.",
                    publication_date: "2024-05-10",
                    category: "신규오픈",
                    publication_name: "인테리어투데이"
                  },
                  {
                    id: 4,
                    title: "건축가 인터뷰: 공간이 주는 감동에 대하여",
                    excerpt: "SOW Architecture의 대표 건축가가 말하는 공간 디자인 철학과 미래 전망",
                    publication_date: "2024-04-25",
                    category: "인터뷰",
                    publication_name: "아키텍처리뷰"
                  }
                ]}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Footer Components */}
      <Section spacing="md" background="white">
        <Container>
          <div className="mb-8">
            <Heading variant="h2" className="mb-4">Footer Components</Heading>
            <Text color="muted">푸터 컴포넌트 variants</Text>
          </div>
          
          <div className="space-y-8">
            <div>
              <Text variant="small" color="muted" className="mb-4">Simple Footer</Text>
              <div className="border border-gray-200 dark:border-gray-700 overflow-hidden">
                <Footer variant="simple" />
              </div>
            </div>
            
            <div>
              <Text variant="small" color="muted" className="mb-4">Detailed Footer</Text>
              <div className="border border-gray-200 dark:border-gray-700 overflow-hidden">
                <Footer variant="detailed" />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}