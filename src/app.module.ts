import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './BoundedContexts/Course/course.module';
import { UserModule } from './user/user.module';
import { DiscountModule } from './BoundedContexts/Course/discount/discount.module';
import { TicketModule } from './BoundedContexts/Ticket/ticket.module';

@Module({
  imports: [CourseModule, UserModule, DiscountModule, TicketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
