const mockSelect = jest.fn();
const mockEq = jest.fn();
const mockOrder = jest.fn();
const mockSingle = jest.fn();
const mockGte = jest.fn();
const mockLte = jest.fn();
const mockInsert = jest.fn();
const mockUpdate = jest.fn();

const mockFrom = jest.fn(() => ({
  select: mockSelect,
  insert: mockInsert,
  update: mockUpdate,
}));

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: mockFrom,
  })),
}));

describe('public supabase query shapes', () => {
  beforeEach(() => {
    jest.resetModules();

    mockSelect.mockReset();
    mockEq.mockReset();
    mockOrder.mockReset();
    mockSingle.mockReset();
    mockGte.mockReset();
    mockLte.mockReset();
    mockInsert.mockReset();
    mockUpdate.mockReset();

    mockSelect.mockReturnValue({
      eq: mockEq,
      order: mockOrder,
      single: mockSingle,
      gte: mockGte,
      lte: mockLte,
    });

    mockEq.mockReturnValue({
      eq: mockEq,
      order: mockOrder,
      single: mockSingle,
      gte: mockGte,
      lte: mockLte,
    });

    mockOrder.mockResolvedValue({ data: [], error: null });
    mockSingle.mockResolvedValue({ data: null, error: { code: 'PGRST116' } });
    mockLte.mockReturnValue({
      eq: mockEq,
      order: mockOrder,
    });

    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon-key';
  });

  it('uses a lightweight select list for published projects', async () => {
    const { getPublishedProjects } = await import('@/lib/supabase');

    await getPublishedProjects();

    expect(mockSelect).toHaveBeenCalledWith('id, created_at, title, subtitle, main_image, is_published');
  });

  it('uses a detail select list for a project detail read', async () => {
    const { getProject } = await import('@/lib/supabase');

    await getProject('1');

    expect(mockSelect).toHaveBeenCalledWith('id, created_at, title, subtitle, main_image, is_published, body');
  });

  it('uses a lightweight select list for published press items', async () => {
    const { getPublishedPressItems } = await import('@/lib/supabase');

    await getPublishedPressItems();

    expect(mockSelect).toHaveBeenCalledWith('id, created_at, title, category, main_image:thumbnail, is_published, published_date, source, link, excerpt');
  });

  it('uses a detail select list for a press detail read', async () => {
    const { getPressItem } = await import('@/lib/supabase');

    await getPressItem(1);

    expect(mockSelect).toHaveBeenCalledWith('id, created_at, title, category, main_image:thumbnail, is_published, published_date, source, link, excerpt, body:content');
  });
});
