import {
  Attachment,
  Category,
  Course,
} from '@prisma/client';
import IconBadge from '@/components/icon-badge';
import {
  CircleDollarSign,
  File,
  LayoutDashboardIcon,
  ListChecks,
} from 'lucide-react';
import TitleForm from './title-form';
import DescriptionForm from './description-form';
import ImageForm from './image-form';
import CategoryForm from './category-form';
import PriceForm from './price-form';
import AttachmentFrom from './attachment-form';

interface IEditCourseForm {
  course: Course & { attachments: Attachment[] };
  categories: Category[];
}

const EditCourseForm: React.FC<IEditCourseForm> = ({
  course,
  categories,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
    <div>
      <div className="flex items-center gap-x-2">
        <IconBadge icon={LayoutDashboardIcon} />
        <h2 className="text-xl">Customize your course</h2>
      </div>
      <TitleForm
        initialData={course}
        courseId={course.id}
      />
      <DescriptionForm
        initialData={course}
        courseId={course.id}
      />
      <ImageForm
        initialData={course}
        courseId={course.id}
      />
      <CategoryForm
        initialData={course}
        courseId={course.id}
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
      />
    </div>
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={ListChecks} />
          <h2 className="text-xl">Course chapters</h2>
        </div>
        <div>TODO: CHAPTERS</div>
      </div>
      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={CircleDollarSign} />
          <h2 className="text-xl">Sell your course</h2>
        </div>
        <PriceForm
          initialData={course}
          courseId={course.id}
        />
      </div>
      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={File} />
          <h2 className="text-xl">
            Resources & Attachments
          </h2>
        </div>
        <AttachmentFrom
          initialData={course}
          courseId={course.id}
        />
      </div>
    </div>
  </div>
);

export default EditCourseForm;
